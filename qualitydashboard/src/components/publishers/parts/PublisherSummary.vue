<template>
  <ul class="registry-card__list">
    <li class="registry-card__item">
      <div class="publisher-summary base-card">
        <div class="base-card__content">
          <section class="grid grid--three-columns">
            <h2 class="base-card__title">589,282 Grants</h2>
          </section>
          <section class="grid grid--four-columns">
            <span class="inline grid__1">
              <h2 class="inline">{{ stats.publisher.recipient_location }}%</h2>
              <img
                class="stat-logo"
                src=""
                alt=""
              />
              <p>of publishers providing recipient locations</p>
            </span>
            <span class="inline grid__1">
              <h2 class="inline">
                {{ stats.publisher.beneficiary_location_names }}%
              </h2>
              <img
                class="stat-logo"
                src=""
                alt=""
              />
              <p>of publishers provide beneficiary location names</p>
            </span>
            <span class="inline grid__1">
              <h2 class="inline">{{ stats.publisher.charity_numbers }}%</h2>
              <img
                class="stat-logo"
                src=""
                alt=""
              />
              <p>Has company or charity numbers</p>
            </span>
            <span class="inline grid__1">
              <h2 class="inline">
                {{ stats.publisher.external_identifiers_95 }}%
              </h2>
              <img
                class="stat-logo"
                src=""
                alt=""
              />
              <p>Have at least 95% external identifiers for recipients</p>
            </span>
          </section>
        </div>
      </div>
    </li>
  </ul>
</template>

<script>
export default {
  name: "PublisherSummary",
  data() {
    return {
      stats: {
        publisher: {
          recipient_location: Math.floor(Math.random() * 100),
          beneficiary_location_names: Math.floor(Math.random() * 100),
          charity_numbers: Math.floor(Math.random() * 100),
          external_identifiers_95: Math.floor(Math.random() * 100),
        },
        org_info_graph: {
          labels: [
            "10%",
            "20%",
            "30%",
            "40%",
            "50%",
            "60%",
            "70%",
            "80%",
            "90%",
            "100%",
          ],
          data: [20, 10, 0, 50, 30, 60, 65, 80, 20, 90],
        },
      },
    };
  },
};
</script>
