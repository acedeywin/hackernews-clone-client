import { Component } from "react";
import { withApollo, WithApolloClient } from "react-apollo";
import Link from "./Link";
import { isVoidExpression } from "typescript";
import { FEED_SEARCH_QUERY } from "../query/Query";

class Search extends Component<WithApolloClient<{}>> {
  _executeSearch = async () => {
    const { filter } = this.state;
    const result = await this.props.client.query({
      query: FEED_SEARCH_QUERY,
      variables: { filter },
    });
    const links = result.data.feed.links;
    this.setState({ links });
  };
  state = {
    links: [],
    filter: "",
  };

  render() {
    return (
      <div>
        <div>
          Search
          <input
            type="text"
            onChange={(e) => this.setState({ filter: e.target.value })}
          />
          <button onClick={() => this._executeSearch()}>Ok</button>
        </div>
        {this.state.links.map((link: any, index: any) => (
          <Link
            key={link.id}
            link={link}
            index={index}
            updateStoreAfterVote={isVoidExpression}
          />
        ))}
      </div>
    );
  }
}

export default withApollo(Search);
