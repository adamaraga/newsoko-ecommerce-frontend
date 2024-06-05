import styled from "styled-components";

export const Input = styled.input`
  height: 35px;
  width: ${(props) => (props.width ? props.width : "100%")};
  border-radius: 5px;
  outline: none;
  background: #fff;
  color: gray;
  border: ${(props) =>
    props.error ? `1px solid #a92424` : `1px solid rgba(0, 0, 0, 0.15)`};
  margin-bottom: 1rem;
  padding: 0 1rem;
  transition: 0.3s;

  &:hover {
    border: ${(props) =>
      props.error ? `1px solid #a92424` : `1px solid #07213e`};
  }

  &:focus {
    border: ${(props) =>
      props.error ? `1px solid #a92424` : `1px solid #07213e`};
  }
`;

export const Textarea = styled.textarea`
  width: ${(props) => (props.width ? props.width : "100%")};
  border-radius: 5px;
  outline: none;
  background: #fff;
  color: gray;
  border: ${(props) =>
    props.error ? `1px solid #a92424` : `1px solid rgba(0, 0, 0, 0.15)`};
  margin-bottom: 1rem;
  padding: 1rem;
  transition: 0.3s;

  &:hover {
    border: ${(props) =>
      props.error ? `1px solid #a92424` : `1px solid #07213e`};
  }

  &:focus {
    border: ${(props) =>
      props.error ? `1px solid #a92424` : `1px solid #07213e`};
  }
`;
export const Select = styled.select`
  height: 35px;
  width: ${(props) => (props.width ? props.width : "100%")};
  border-radius: 5px;
  outline: none;
  background: #fff;
  color: gray;
  border: ${(props) =>
    props.error ? `1px solid #a92424` : `1px solid rgba(0, 0, 0, 0.15)`};
  margin-bottom: 1rem;
  padding: 0 1rem;
  transition: 0.3s;

  &:hover {
    border: ${(props) =>
      props.error ? `1px solid #a92424` : `1px solid #07213e`};
  }

  &:focus {
    border: ${(props) =>
      props.error ? `1px solid #a92424` : `1px solid #07213e`};
  }
`;

export const ErrorMessage = styled.div`
  color: #a92424;
  font-size: 1.2rem;
  display: ${(props) => (props.show ? "inline-block" : "none")};
  position: relative;
  top: ${(props) => (props.top ? props.top : "-1rem")};
`;

export const Label = styled.label`
  color: gray;
  font-size: 1.3rem;
  margin-bottom: 8px;
  display: inline-block;
  font-weight: 600;
  & span {
    color: red;
  }
`;
