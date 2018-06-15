import os

from flask import url_for
import pytest
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.action_chains import ActionChains

from registry.views import get_data_by_prefix
from tests.samples.registry_raw_data import RAW_DATA

BROWSER = os.environ.get('BROWSER', 'ChromeHeadless')


@pytest.fixture(scope="module")
def browser(request):
    if BROWSER == 'ChromeHeadless':
        chrome_options = Options()
        chrome_options.add_argument("--headless")
        browser = webdriver.Chrome(chrome_options=chrome_options)
    else:
        browser = getattr(webdriver, BROWSER)()
    browser.implicitly_wait(3)
    request.addfinalizer(lambda: browser.quit())
    return browser


@pytest.fixture(scope="module")
def dataload():
    get_data_by_prefix(RAW_DATA)


@pytest.mark.usefixtures('live_server')
def test_nav_menu(dataload, browser):
    browser.get(url_for('data_registry', _external=True))

    text_body = browser.find_element_by_tag_name('body').text

    assert 'MENU' in text_body
    assert 'Home' not in text_body
    assert 'The 360Giving Standard' not in text_body
    assert 'Discussion Forum' not in text_body


@pytest.mark.usefixtures('live_server')
def test_nav_menu_hover(dataload, browser):
    browser.get(url_for('data_registry', _external=True))
    element = browser.find_element_by_id('menu')
    hover = ActionChains(browser).move_to_element(element)
    hover.perform()

    text_body = browser.find_element_by_tag_name('body').text

    assert 'MENU' in text_body
    assert 'Home' in text_body
    assert 'The 360Giving Standard' in text_body
    assert 'Discussion Forum' in text_body


@pytest.mark.usefixtures('live_server')
def test_nav_menu_home_link(dataload, browser):
    browser.get(url_for('data_registry', _external=True))
    element = browser.find_element_by_id('menu')
    hover = ActionChains(browser).move_to_element(element)
    hover.perform()

    browser.find_element_by_link_text('Home').click()

    assert browser.current_url == 'http://www.threesixtygiving.org/'


@pytest.mark.usefixtures('live_server')
def test_body_h1(dataload, browser):
    browser.get(url_for('data_registry', _external=True))

    assert 'DATA REGISTRY' in browser.find_element_by_tag_name('body').text


@pytest.mark.usefixtures('live_server')
@pytest.mark.parametrize('link_text', [
    'Tools & Projects',
    'http://standard.threesixtygiving.org/en/latest/getdata/',
    'registering your data',
    'contact us',
    ])
def test_body_links(dataload, browser, link_text):
    browser.get(url_for('data_registry', _external=True))
    browser.find_element_by_link_text(link_text)


@pytest.mark.usefixtures('live_server')
@pytest.mark.parametrize('table_heading_text', [
    'Logo',
    'Organisation',
    'Data',
    'License',
    ])
def test_table_heading(dataload, browser, table_heading_text):
    browser.get(url_for('data_registry', _external=True))

    table_headings_text = []
    for table_heading in browser.find_elements_by_tag_name('th'):
        table_headings_text.append(table_heading.text)

    assert table_heading_text in table_headings_text


# @pytest.mark.usefixtures('live_server')
# def test_table_data(dataload, browser):
#     browser.get(url_for('data_registry', _external=True))
#
#     table_data_text = []
#     for table_data in browser.find_elements_by_tag_name('td'):
#         table_data_text.append(table_data.text)
#
#     assert 'jlskjdf' in table_data_text


@pytest.mark.usefixtures('live_server')
@pytest.mark.parametrize('link_text', [
    'Privacy',
    'Terms & Conditions',
    'Cookie Policy',
    'Take Down Policy',
    'License',
    ])
def test_footer_links(dataload, browser, link_text):
    browser.get(url_for('data_registry', _external=True))
    browser.find_element_by_link_text(link_text)


@pytest.mark.usefixtures('live_server')
@pytest.mark.parametrize('contact_text', [
    '020 3752 5775',
    'info@threesixtygiving.org',
    ])
def test_footer_contact(dataload, browser, contact_text):
    browser.get(url_for('data_registry', _external=True))
    browser.find_element_by_link_text(contact_text)
