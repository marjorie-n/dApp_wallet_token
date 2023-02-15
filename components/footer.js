import styled from "styled-components";

const FooterStyled = styled.footer`
  background-color: black !important;
  height: 180px!important;
`;
const TextCenter = styled.div`
  color: white!important;
  text-align: center;
`;

export default function Footer() {
  return (
    <FooterStyled className="bg-dark text-center text-lg-start">
      <TextCenter className="text-center p-3">
        @2021 developed by &nbsp;
        <a
          className="text-primary"
          href="https://www.linkedin.com/in/marjorie-ngoupende-dev/"
          target="_blank"
        >
          Marjorie Ngoupende
        </a>{" "}
        |{" "}
        <a className="text-danger" href="https://www.wildcodeschool.com/"
        target="_blank">
          {" "}
          Wild Code School Campus Blockchain{" "}
        </a>
      </TextCenter>
    </FooterStyled>
  );
}
// End of file
