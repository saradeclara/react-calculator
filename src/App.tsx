import {
  BasicOperationKeys,
  Display,
  FunctionKeys,
  HistoryLog,
  NumberKeys,
} from "./components";
import { numberKeysData } from "./data";

function App() {
  return (
    <div>
      <h1>react calculator</h1>
      <div id="calculator-wrapper">
        <Display />
        <FunctionKeys />
        <BasicOperationKeys />
        <NumberKeys keys={numberKeysData} />
        <HistoryLog />
      </div>
    </div>
  );
}

export default App;
