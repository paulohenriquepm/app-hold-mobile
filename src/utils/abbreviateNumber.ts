const abbreviateNumber = (num: number, fixed = 0) => {
  const power = Number(num).toPrecision(2).split('e'); // get power

  const numberScaleIndex =
    power.length === 1
      ? 0
      : Math.floor(Math.min(Number(power[1].slice(1)), 14) / 3); // floor at decimals, ceiling at trillions

  const numberDividedByPower = Number(
    numberScaleIndex < 1
      ? num.toFixed(0 + fixed)
      : (num / 10 ** (numberScaleIndex * 3)).toFixed(1 + fixed),
  ); // divide by power

  const enforcedNumber =
    numberDividedByPower < 0
      ? numberDividedByPower
      : Math.abs(numberDividedByPower); // enforce -0 is 0

  const abbreviatedNumber = `${enforcedNumber}${
    ['', 'K', 'M', 'B', 'T'][numberScaleIndex]
  }`; // append power

  return abbreviatedNumber;
};

export { abbreviateNumber };
