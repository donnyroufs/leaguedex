import styled from "styled-components";

export const Styles = styled.div`
  display: flex;
  justify-content: center;
  width: 80%;
  margin: 4rem auto;
  max-width: 1400px;

  margin-top: 75px;

  @media screen and (min-width: 968px) {
    margin-top: 275px;
  }

  table {
    margin-top: 3rem;
    border-spacing: 0;
    border: 1px solid ${(props) => props.theme.border};

    th,
    td {
      margin: 0;
      padding: 1rem;
      border-bottom: 1px solid ${(props) => props.theme.border};

      :last-child {
        border-right: 0;
      }
    }

    th {
      border-right: 1px solid ${(props) => props.theme.border};
    }

    tbody {
      tr {
        :nth-child(odd) {
          background-color: #f2f2f21c;
        }
      }

      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }
  }

  input {
    border: 1px solid ${(props) => props.theme.border};
    background: transparent;
    color: ${(props) => props.theme.third};
    width: 100%;
    min-width: 150px;

    ::placeholder {
      color: ${(props) => props.theme.placeholderText};
      opacity: 1;
    }

    :-ms-input-placeholder {
      color: ${(props) => props.theme.placeholderText};
    }

    ::-ms-input-placeholder {
      color: ${(props) => props.theme.placeholderText};
    }

    @media screen and (min-width: 968px) {
      padding: 0.7rem 0.8rem;
    }
  }
`;
