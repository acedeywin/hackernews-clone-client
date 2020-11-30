import { Component } from "react";
import { LinkInterface } from "../interfaces/Interfaces";
import { AUTH_TOKEN } from "../constants";
import { timeDifferenceForDate } from "../utils";
import { VOTE_MUTATION } from "../query/Query";
import { Mutation } from "react-apollo";

class Link extends Component<LinkInterface> {
  _voteForLink = () => {};
  render() {
    const authToken = localStorage.getItem(AUTH_TOKEN);
    return (
      <div className="flex mt2 items-start">
        <div className="flex items-center">
          <span className="gray">{this.props.index + 1}.</span>
          {authToken && (
            <Mutation
              mutation={VOTE_MUTATION}
              variables={{ linkId: this.props.link.id }}
              update={(store: any, { data: { vote } }: any) =>
                this.props.updateStoreAfterVote(store, vote, this.props.link.id)
              }
            >
              {(voteMutation: any) => (
                <div className="ml1 gray f11" onClick={voteMutation}>
                  ▲
                </div>
              )}
            </Mutation>
          )}
        </div>
        <div className="ml1">
          <div>
            {this.props.link.description} ({this.props.link.url})
          </div>
          <div className="f6 lh-copy gray">
            {this.props.link.votes.length} votes | by{" "}
            {this.props.link.postedBy
              ? this.props.link.postedBy.name
              : "Unknown"}{" "}
            {timeDifferenceForDate(this.props.link.createdAt)}
          </div>
        </div>
      </div>
    );
  }
}

export default Link;

// function Search(props: any) {
//   const [links, setLinks] = useState<any>(""),
//     [filter, setFilter] = useState<any>([]);

//   const _executeSearch = async () => {
//     const { filter } = props;
//     const result = await props.client.query({
//       query: FEED_SEARCH_QUERY,
//       variables: { filter },
//     });
//     const links = result.data.feed.links;
//     setLinks({ links });
//   };

//   return (
//     <div>
//       <div>
//         Search
//         <input
//           type="text"
//           onChange={(e) => setFilter({ filter: e.target.value })}
//         />
//         <button onClick={() => _executeSearch()}>Ok</button>
//       </div>
//       {props.links.map((link: any, index: any) => (
//         <Link
//           key={link.id}
//           link={link}
//           index={index}
//           updateStoreAfterVote={isVoidExpression}
//         />
//       ))}
//     </div>
//   );
// }
