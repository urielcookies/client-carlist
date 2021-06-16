import styled from 'styled-components';

interface Palette {
  type: string;
  grey: {
    50: string;
    900: string;
  }
};

const imageBackground = (palette: Palette) => palette.type === 'light' ? palette.grey[50] : palette.grey[900]
const LoginStyle = styled.div`
  .root {
    height: 95vh;
  }

  .image {
    background-image: url(https://source.unsplash.com/random);
    background-repeat: no-repeat;
    background-color: ${props => imageBackground(props.theme.palette)};
    background-size: cover;
    background-position: center;
  }

  .paper {
    margin: theme.spacing(8, 4);
    margin: ${props => props.theme.spacing(8, 4)};
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .avatar {
    margin: ${props => props.theme.spacing(1)};
    background-color: ${props => props.theme.palette.secondary.main};
  }

  .form {
    width: 100%; // Fix IE 11 issue.
    margin-top: ${props => props.theme.spacing(1)};
  }

  .submit: {
    margin: ${props => props.theme.spacing(3, 0, 2)};
  }

  #errorMessage {
    color: red;
    height: 20px;
    text-align: center;
  }
`;

export default LoginStyle;
