import React, { Component, Fragment } from "react";
import { Query } from "react-apollo";
import {
  FEED_QUERY,
  NEW_LINKS_SUBSCRIPTION,
  NEW_VOTES_SUBSCRIPTION,
} from "../query/Query";
import Link from "./Link";
import { LINKS_PER_PAGE } from "../constants";
import { LinkInterface, RenderData, History } from "../interfaces/Interfaces";

class LinkList extends Component<History, LinkInterface> {
  _updateCacheAfterVote = (store: any, createVote: any, linkId: string) => {
    const isNewPage = this.props.location.pathname.includes("new");
    const page = parseInt(this.props.match.params.page, 10);

    const skip = isNewPage ? (page - 1) * LINKS_PER_PAGE : 0;
    const first = isNewPage ? LINKS_PER_PAGE : 100;
    const orderBy = isNewPage ? "createdAt_DESC" : null;
    const data = store.readQuery({
      query: FEED_QUERY,
      variables: { first, skip, orderBy },
    });
    const votedLink = data.feed.links.find((link: any) => link.id === linkId);
    votedLink.votes = createVote.link.votes;
    store.writeQuery({ query: FEED_QUERY, data });
  };

  _subcribeToNewLinks = (subscribeToMore: any) => {
    subscribeToMore({
      document: NEW_LINKS_SUBSCRIPTION,
      updateQuery: (prev: any, { subscriptionData }: any) => {
        if (subscriptionData.data) return prev;
        const newLink = subscriptionData.data.newLink;
        const exists = prev.feed.links.find(({ id }: any) => id === newLink.id);
        if (exists) return prev;

        return Object.assign({}, prev, {
          feed: {
            links: [newLink, ...prev.feed.links],
            count: prev.feed.links.length + 1,
            __typename: prev.feed.__typename,
          },
        });
      },
    });
  };

  _subscribeToNewVotes = (subscribeToMore: any) => {
    subscribeToMore({
      document: NEW_VOTES_SUBSCRIPTION,
    });
  };

  _getQueryVariables = () => {
    const isNewPage = this.props.location.pathname.includes("new");
    const page = parseInt(this.props.match.params.page, 10);

    const skip = isNewPage ? (page - 1) * LINKS_PER_PAGE : 0;
    const first = isNewPage ? LINKS_PER_PAGE : 100;
    const orderBy = isNewPage ? "createdAt_DESC" : null;
    return { first, skip, orderBy };
  };

  _getLinksToRender = (data: any) => {
    const isNewPage = this.props.location.pathname.includes("new");
    if (isNewPage) {
      return data.feed.links;
    }
    const rankedLists = data.feed.links.slice();
    rankedLists.sort((l1: any, l2: any) => l2.votes.length - l1.votes.length);
  };

  _nextPage = (data: any) => {
    const page = parseInt(this.props.match.params.page, 10);
    if (page <= data.feed.count / LINKS_PER_PAGE) {
      const nextPage = page + 1;
      this.props.history.push(`/new/${nextPage}`);
    }
  };

  _previousPage = () => {
    const page = parseInt(this.props.match.params.page, 10);
    if (page > 1) {
      const previousPage = page - 1;
      this.props.history.push(`/new/${previousPage}`);
    }
  };

  render() {
    return (
      <Query<RenderData>
        query={FEED_QUERY}
        variables={this._getQueryVariables()}
      >
        {({ loading, error, data, subscribeToMore }) => {
          if (loading) return <div>Fetching</div>;
          if (error) return <div>Error</div>;

          this._subcribeToNewLinks(subscribeToMore);
          this._subscribeToNewVotes(subscribeToMore);

          const linksToRender = this._getLinksToRender(data);
          const isNewPage = this.props.location.pathname.includes("new");
          const pageIndex = this.props.match.params.page
            ? (this.props.match.params.page - 1) * LINKS_PER_PAGE
            : 0;

          //const linksToRender = data?.feed.links;

          return (
            <Fragment>
              {linksToRender
                ? linksToRender.map((link: any, index: any) => (
                    <Link
                      key={link.id}
                      link={link}
                      index={index + pageIndex}
                      updateStoreAfterVote={this._updateCacheAfterVote}
                    />
                  ))
                : `Sorry, can't find any`}
              {isNewPage && (
                <div className="flex ml4 mv3 gray">
                  <div className="pointer mr2" onClick={this._previousPage}>
                    Previous
                  </div>
                  <div className="pointer" onClick={() => this._nextPage(data)}>
                    Next
                  </div>
                </div>
              )}
            </Fragment>
          );
        }}
      </Query>
    );
  }
}

export default LinkList;
