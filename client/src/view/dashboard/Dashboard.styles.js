import styled from "styled-components";

export const Styles = styled.div`
  width: 80%;
  margin: 4rem auto;
  max-width: 1400px;
  table {
    border-spacing: 0;
    border: 1px solid ${(props) => props.theme.border};
    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }
    th,
    td {
      margin: 0;
      padding: 1rem;
      border-bottom: 1px solid ${(props) => props.theme.border};
      border-right: 1px solid ${(props) => props.theme.border};
      :last-child {
        border-right: 0;
      }
    }
  }
`;
