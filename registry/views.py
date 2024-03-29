from datetime import datetime
import json
import os

from flask import Flask, render_template, current_app
from raven.contrib.flask import Sentry

from registry.registry import get_data_sorted_by_prefix, get_schema_org_list, get_raw_data
from registry.salesforce import get_salesforce_data


app = Flask(__name__)

sentry = Sentry(app)


@app.context_processor
def inject_footer_menu():
    with open(os.path.join(os.path.dirname(__file__), 'footer.json')) as a:
        return dict(
            settings360=json.load(a),
            now=datetime.now(),
        )


def dashboard_view(path):
    return render_template("vue-build/index.html")


def data_registry_view():
    raw_data = get_raw_data()
    data = get_data_sorted_by_prefix(raw_data)
    schema = get_schema_org_list(raw_data)

    return render_template(
        'registry.html',
        data=data,
        schema=schema,
        num_of_publishers=len(data)
    )


# Temporary mode switcher whilst we have both registry and dashboard applications
# here. MODE=dashboard | or unset/other value
if os.environ.get("MODE") == "dashboard":
    @app.route('/', defaults={'path': ''})
    @app.route('/<path:path>')
    def dashboard(path):
        return dashboard_view(path)

    @app.route('/registry')
    def data_registry():
        return data_registry_view()

else:
    @app.route('/')
    def data_registry():
        return data_registry_view()

    @app.route('/dashboard', defaults={'path': ''})
    @app.route('/dashboard/<path:path>')
    def dashboard(path):
        return dashboard_view(path)


@app.route('/terms-conditions')
def terms_and_conditions():
    return render_template('terms.html')


@app.route('/data.json')
def salesforce_data():
    data = get_salesforce_data()
    return current_app.response_class(data, mimetype="application/json")


@app.route('/500')
def test_500_error():
    """
    Function to test a 500 error.
    """
    raise Exception
