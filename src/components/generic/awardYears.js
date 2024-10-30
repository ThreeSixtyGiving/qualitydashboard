import numeral from 'numeral';

const YEARS = 10;

const earlyYears = (awardData, pre) => {
  return Object.entries(awardData)
                .filter(entry => entry[0] < pre)
                .reduce((acc, entry) => acc + entry[1], 0)
}

const oldData = (awardData, pre) => {
  return {
    label: `Older data`,
    value: earlyYears(awardData, pre),
    value_text: numeral(earlyYears(awardData, pre)).format('( 0a)'),
    detail: `${numeral(earlyYears(awardData, pre)).format('( 0a)')} grants awarded before ${pre}`
  }
}

const getDataForYears = (awardData, years) => {
  return years.map(year => {
    return {
      label: year,
      value: awardData[year],
      value_text: numeral(awardData[year]).format('( 0a)'),
      detail: `${numeral(awardData[year]).format('( 0a)')} grants awarded in ${year}`
    }
  })
}

const getYears = awardData => {
  const steps = Array.from({length: YEARS}, (x, i) => i);
  const previous = steps.map(step => new Date().getFullYear()-step).sort();
  const minYear = Math.min(...previous);
  const preData = oldData(awardData, minYear);
  const numeratedYears = getDataForYears(awardData, previous);
  return [preData, ...numeratedYears];
}

export default getYears;
