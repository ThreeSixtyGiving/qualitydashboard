const badges = [
  {
    qualityMetric: 'hasGrantDuration',
    iconName: 'event_note',
    label: 'Includes grant duration'
  },
  {
    qualityMetric: 'hasGrantClassification',
    iconName: 'label',
    label: 'Includes classifications'
  },
  {
    qualityMetric: 'hasGrantProgrammeTitle',
    iconName: 'format_quote',
    label: 'Includes programme names'
  },
  {
    qualityMetric: 'hasRecipientOrgLocations',
    iconName: 'person_pin_circle',
    label: 'Includes recipient location codes'
  },
  {
    qualityMetric: 'hasBeneficiaryLocationName',
    iconName: 'edit_location',
    label: 'Includes grant location name'
  },
  {
    qualityMetric: 'hasBeneficiaryLocationGeoCode',
    iconName: 'location_on',
    label: 'Includes grant location codes'
  },
  {
    qualityMetric: 'has50pcExternalOrgId',
    iconName: 'confirmation_number',
    label: 'Includes over 50% external org IDs'
  },
  {
    qualityMetric: 'publishedThisYear',
    iconName: 'event_available',
    label: 'Have published in the last year'
  },
  {
    qualityMetric: 'publishedLastThreeMonths',
    iconName: 'event_available',
    label: 'Have published within the last three months'
  },
  {
    qualityMetric: 'hasRecipientIndividualsCodelists',
    iconName: 'label',
    label: 'Includes grants to individuals codes'
  },
];

const today = new Date();

const getBadges = publisher => {

  /* If for some reason we have no quality information about this publisher
   * avoid error and just return empty arrays
   */
  if (!publisher.quality){
    return { available: [], unavailable: [] };
  }

  let wonBadges = [];
  let lostBadges = [];

  for (let metric in publisher.quality) {
    if (publisher.quality[metric] === 100){
      wonBadges.push(metric);
    } else {
      lostBadges.push(metric);
    }
  }

  let available = [];
  let unavailable = [];


  badges.forEach((badge)=> {

    if (badge.qualityMetric == 'publishedLastThreeMonths'){
      let lastLastModifiedDate = new Date(publisher.last_published);
      let todayLessThreeMonths = new Date(today.getTime() - (2628000000*3));

      if (lastLastModifiedDate.getTime() >= todayLessThreeMonths.getTime()){
        available.push(badge);
      } else {
        unavailable.push(badge);
      }

      return;
    }

    if (badge.qualityMetric == 'publishedThisYear'){
      let lastLastModifiedDate = new Date(publisher.last_published);

      let todayLessAYear = new Date(today.getTime() - (2628000000*12));

      if (lastLastModifiedDate.getTime() >= todayLessAYear.getTime()){
        available.push(badge);
      } else {
        unavailable.push(badge);
      }

      return;
    }

    if (wonBadges.includes(badge.qualityMetric)){
      available.push(badge);
    }
    if (lostBadges.includes(badge.qualityMetric)) {
      unavailable.push(badge);
    }

  });

  return { available: available, unavailable: unavailable }
}

export { badges, getBadges };
