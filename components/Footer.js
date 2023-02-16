import styled from "styled-components";

const FooterStyled = styled.footer`
  height: 380px !important;
`;
const TextCenter = styled.div`
  color: white !important;
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
        >
          Marjorie Ngoupende
        </a>{" "}
        |
        <a className="text-black" href="https://github.com/Margotte83/dApp_wallet_token" target="_blank">
          {" "}
          Github link{" "}
        </a>
        | &nbsp;
        <a
          className="text-danger"
          href="https://www.wildcodeschool.com/fr-FR/blog/developpeur-blockchain-formation-developpement-ethereum"
          target="_blank"
        >
          {" "}
          Wild Code School{" "}
        </a>
      </TextCenter>
    </FooterStyled>
  );
}
// End of file