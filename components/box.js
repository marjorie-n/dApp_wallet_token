import styled from "styled-components";

const BoxStyled = styled.div`
  border: 3px solid rgba(32, 32, 32, 0.5);
  border-radius: 2.5em;
  padding: 1.5rem 5rem 2rem;
  max-width: 56em;
  text-align: center;
  margin: 0 auto 4rem;
  box-sizing: border-box;
`;

const Emoji = styled.span`
  font-size: 2em;
  margin: 0 0.5rem;
  display: inline-block;
`;
const Paragraphe = styled.p`
  color: red;
`;
export default function Box() {
  return (
    <BoxStyled>
      <Emoji>💰</Emoji>
      <h2> A dApp to exchange ERC20 tokens</h2>
      <p className="h5">Consult the balance of his Tokens; 📈</p>
      <p className="h5">Send ERC20 tokens ; ↗️</p>
      <br></br>
      <Paragraphe className="h4">
        Metamask is required to interact with the dApp; 🦊
      </Paragraphe>
      <Paragraphe className="h4">
        Testnet is required to interact with the dApp; 🔒
      </Paragraphe>
      <br></br>
      <button
        className="btn btn-primary"
        onClick={() => {
          window.location.href =
            "https://github.com/Margotte83/dApp_wallet_token";
        }}
        target="_blank"
        rel="noopener noreferrer"
      >
        My Github repo
      </button>
    </BoxStyled>
  );
}
// End of file
