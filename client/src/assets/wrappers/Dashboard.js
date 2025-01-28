import styled from 'styled-components';

const Wrapper = styled.section`
  .dashboard {
    // So in small screen the SmallSidebar will be 1 cloumn
    display: grid;
    grid-template-columns: 1fr;
  }
  .dashboard-page {
    width: 90vw;
    margin: 0 auto;
    padding: 2rem 0;
  }
  @media (min-width: 992px) {
    // So in big screen the BigSidebar will be the first column
    .dashboard {
      // auto => so the first column will have the width of the content, so the first column will be the width of the BigSidebar whatever it is,
      // because on a big screen we only display the BigSidebar
      grid-template-columns: auto 1fr;
    }
    .dashboard-page {
      width: 90%;
    }
  }
`;
export default Wrapper;
