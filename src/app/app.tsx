// eslint-disable-next-line @nx/enforce-module-boundaries
import styled from 'styled-components';
import NxWelcome from './nx-welcome';

const StyledApp = styled.div`
  // Your style here
`;

export function App() {
  return (
    <StyledApp>
      <NxWelcome title="mr-pepper" />
    </StyledApp>
  );
}

export default App;
