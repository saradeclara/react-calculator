import { HistoryLogProps } from "../types";
import { CSSTransition, TransitionGroup } from "react-transition-group";

export default function HistoryLog({ log }: HistoryLogProps) {
	return (
		<div id="main-history-wrapper">
			<h2>history log</h2>
			<div id="history-log-wrapper">
				<TransitionGroup className="history-transition-group">
					{log.map(({ operation, nodeRef, result }, index) => {
						return (
							<CSSTransition
								key={`key-${index}`}
								nodeRef={nodeRef}
								timeout={600}
								classNames="item"
							>
								<div ref={nodeRef} className="history-log-single">
									<div className="operation">{operation}</div>
									<div className="result">{result}</div>
								</div>
							</CSSTransition>
						);
					})}
				</TransitionGroup>
			</div>
		</div>
	);
}
