import ChartMaker from './containers/chartMaker/ChartMaker';

function App() {
  return (
      <div className="App" data-test='component-app'>
        <ChartMaker data-test='component-chart-maker'/>
      </div>
  );
}

export default App;
