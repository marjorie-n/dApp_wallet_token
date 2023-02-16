import styled from "styled-components";

const FooterStyled = styled.footer`
  height: 100px !important;
`;
const TextCenter = styled.div`
  color: black !important;
  text-align: center;
`;

export default function Footer() {
  return (
    <FooterStyled className="bg-white text-center text-lg-start">
      <TextCenter className="text-center p-3">
        @2021 developed by &nbsp;
        <a
          className="text-primary"
          href="https://www.linkedin.com/in/marjorie-ngoupende-dev/"
          target="_blank"
          rel="noreferrer"
        >
          Marjorie Ngoupende
        </a>{" "}
        |
        <a
          className="text-black"
          href="https://github.com/Margotte83/dApp_wallet_token"
          target="_blank"
          rel="noreferrer"
        >
          {" "}
          Github link{" "}
        </a>
        | &nbsp;
        <a
          className="text-danger"
          href="https://www.wildcodeschool.com/fr-FR/blog/developpeur-blockchain-formation-developpement-ethereum"
          target="_blank"
          rel="noreferrer"
        >
          {" "}
          Wild Code School{" "}
        </a>
      </TextCenter>
    </FooterStyled>
  );
}
// End of file
