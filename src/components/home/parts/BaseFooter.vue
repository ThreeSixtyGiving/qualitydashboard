<template>
  <footer class="layout__footer">
        <div class="subscribe-section">
        <div class="subscribe-section__wrapper">
            <form action="#" class="subscribe-section__form">
                <label for="subscribe" class="screen-reader-only">Subscribe</label>
                <input type="email" id="subscribe" placeholder="Subscribe to our newsletter">
                <input type="submit" value="Send">
            </form>
        </div>
    </div>
    <footer class="footer">
        <div class="footer__row wrapper">
            <div class="footer__column-2 footer__branding">
                <div class="footer__logo"><img
                        src="@/assets/images/360-logos/360-giving-logo-white.svg" alt="360Giving">
                </div>
                <p class="footer__tagline">Open data for more effective grantmaking</p>
            </div>
            <div class="footer__column-1 footer__social">
                <a href="https://github.com/ThreeSixtyGiving/insights-ng" class="github-icon"><img
                        src="@/assets/images/github-logo.svg" alt="Check our Github"></a>
                <a href="https://twitter.com/360Giving/" class="twitter-icon"><img
                        src="@/assets/images/twitter-logo.svg"
                        alt="Follow us on Twitter"></a>
            </div>
        </div>

        <div class="footer__row wrapper">
            <div class="footer__column-2 footer__section medium-up">
                <h3 class="footer__heading">Links</h3>
                <ul>
                    <li><a href="/">Home</a></li>
                    <li><a href="https://threesixtygiving.org/about">About</a></li>
                    <li><a href="https://threesixtygiving.org/">360Giving</a></li>
                </ul>
            </div>

            <div class="footer__column-2 footer__section medium-up">
                <h3 class="footer__heading">Other Products</h3>
                <ul>
                    <li><a href="https://grantnav.threesixtygiving.org/">GrantNav</a></li>
                    <li><a href="https://insights.threesixtygiving.org/">Insights</a></li>
                    <li><a href="https://standard.threesixtygiving.org/">Data Standard</a></li>
                    <li><a href="https://dataquality.threesixtygiving.org/">Data Quality Tool</a></li>
                </ul>
            </div>

            <div class="footer__column-3 footer__section">
                <h3 class="footer__heading">Quality Dashboard</h3>
                <p>A dashboard showing the data quality of 360Giving data as a whole and for each individual publisher. It provides insights into the key features that make the data useful for analysis to help publishers to identify opportunities for their data to be improved.
                </p>
            </div>

            <div class="footer__column-3 footer__section">
                <h3 class="footer__heading">360Giving</h3>
                <p>We help organisations openly publish grants data, and help people use it to improve charitable
                    giving.</p>

                <p><a href="https://threesixtygiving.org">Find out more about 360Giving</a>.</p>

            </div>

        </div>

        <div class="footer__row wrapper footer__small-print">

            <div class="footer__column-2">
                <p>© Copyright 2021 360Giving.<br>Licensed under a <a href="https://creativecommons.org/licenses/by/4.0/" target="_blank">Creative Commons Attribution 4.0 International License</a>.</p>
            </div>
            <div class="footer__column-2 footer__policy-links hide-print">
                <p><a href="https://www.threesixtygiving.org/privacy/">Privacy Notice</a> | <a href="https://www.threesixtygiving.org/terms-conditions/">Terms &amp; Conditions</a> | <a href="https://www.threesixtygiving.org/cookie-policy/">Cookie Policy</a> | <a href="https://www.threesixtygiving.org/take-down-policy/">Take Down Policy</a> | <a href="https://www.threesixtygiving.org/about/360giving-code-conduct/">Code of Conduct</a></p>
            </div>
        </div>
    </footer>

</footer>
</template>

<script>
export default {
  name: "BaseFooter",
};
</script>
