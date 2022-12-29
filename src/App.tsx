/* time.tsx */
import { jsx } from '@xania/view';
import { State, combineLatest } from '@xania/state';
import "./App.scss";

export function App() {
  const count = new State<number>();
  const double = count.map((x) => {
    console.log('Doubl', x);
    return x * 2;
  });
  const triple = count.map((x) => {
    console.log('Tripl', x);
    return x * 3;
  });
  const quadruple = double.map((x) => {
    console.log('Quadr', x);
    return x * 2;
  });
  const sum = combineLatest([count, triple, quadruple]).map((values) => {
    console.log('Sum', values);
    return values.reduce((x, y) => x + y, 0);
  });

  return (
    <div class="App">
      <header class="App-header">
        <div class="Diamond">
          <div class="Count">{count}</div>
          <div class="Double">{double}</div>
          <div class="Triple">{triple}</div>
          <div class="Quadruple">{quadruple}</div>
          <div class="Sum">
            <span>{sum}</span>
          </div>
        </div>

        <button click={(_) => count.set((x) => (x | 0) + 1)}>increment</button>
      </header>
    </div>
  );
}