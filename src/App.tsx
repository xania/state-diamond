/* time.tsx */
import { jsx } from '@xania/view';
import { State, combineLatest } from '@xania/state';
import './App.scss';

export function App() {
  const count = new State<number>();
  const double = count.map((x) => x * 2);
  const triple = count.map((x) => x * 3);
  const quadruple = double.map((x) => x * 2);

  const sum = combineLatest([count, triple, quadruple]).map((values) =>
    values.reduce((x, y) => x + y, 0)
  );

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

        <button click={(_) => count.set((x) => (x || 0) + 1)}>increment</button>
      </header>
    </div>
  );
}

function someOtherStuff() {
  return 420;
}

interface ViewListProps {
  videos: State<any[]>,
  emptyHeading: State<string>;
}

// Working version in Xania
function VideoList({ videos, emptyHeading }: ViewListProps) {
  const vm$ = videos.join(emptyHeading).map(([videos, emptyHeading]) => {
    const count = videos.length;

    let heading = emptyHeading;
    let somethingElse = 42;
    
    if (count > 0) {
      const noun = count > 1 ? 'Videos' : 'Video';
      heading = count + ' ' + noun;
      somethingElse = someOtherStuff();
    }
    return { heading, somethingElse }
  });
  return (
    <>
      <h1>{vm$.prop("heading")}</h1>
      <h2>{vm$.prop("somethingElse")}</h2>
    </>
  );
}
