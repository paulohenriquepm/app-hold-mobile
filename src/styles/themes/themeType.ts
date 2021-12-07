type ThemeType = {
  title: string;

  colors: {
    primary: string;
    secondary: string;
    danger: string;

    title: string;
    background: string;
    text: string;
    subText: string;

    buttonText: string;
    buttonGreyBorderColor: string;
  };

  fonts: {
    regular: string;
    medium: string;
    bold: string;
  };
};

export { ThemeType };
