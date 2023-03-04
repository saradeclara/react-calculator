import { HistoryProps } from '../helpers/interfaces';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

export default function History({ log }: HistoryProps) {
    return (
        <div className="history-window">
            <h3>History</h3>
            <TransitionGroup className="todo-list">
                {log.map(({ stringOperation, result, nodeRef }, index) => {
                    return (
                        <CSSTransition
                            key={`key-${index}`}
                            nodeRef={nodeRef}
                            timeout={500}
                            classNames="item"
                        >
                            <div ref={nodeRef} className="history-log-single">
                                <div className="operation">
                                    {stringOperation}
                                </div>
                                <div className="result">{result}</div>
                            </div>
                        </CSSTransition>
                    );
                })}
            </TransitionGroup>
        </div>
    );
}
