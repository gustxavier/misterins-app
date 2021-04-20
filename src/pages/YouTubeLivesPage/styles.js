import styled from 'styled-components';

export const Container = styled.main`
  display: flex;
  min-height: 100vh;
  @media screen and (max-width: ${(props) => props.theme.breakpoints.md}) {
    flex-direction: column;
  }
`;

export const Main = styled.section`
  background: ${(props) => props.theme.colors.dark};
  width: 100%;
  height: 100hv;
  overflow-y: hidden;
  padding: 40px;

  @media screen and (max-width: ${(props) => props.theme.breakpoints.md}) {
    height: 100%;
  }

  @media screen and (max-width: ${(props) => props.theme.breakpoints.sm}) {
    padding: 40px 20px;
  }
`;
