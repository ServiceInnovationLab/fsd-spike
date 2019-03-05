import React, { Component } from 'react';
import { Form, Field } from 'react-final-form';
import PropTypes from 'prop-types';
import AutoSuggest from '../containers/auto-suggest';

const radiusOptions = ['10', '25', '50', '100'];
export default class SearchForm extends Component {
  static propTypes = {
    autoSuggestOnChange: PropTypes.func.isRequired,
    address: PropTypes.string.isRequired,
    region: PropTypes.string.isRequired,
    doResetSearch: PropTypes.func.isRequired,
    initialValues: PropTypes.object.isRequired,
    updateSearchParams: PropTypes.func.isRequired,
    showExtraButtons: PropTypes.bool.isRequired,
  };

  onSubmit(values) {
    const { dirtyFields } = arguments[1].getState();
    Object.keys(dirtyFields).forEach(field => {
      if (!values[field] && !(values[field] === 'undefined')) values[field] = '';
    });

    this.props.updateSearchParams(values);
  }

  render() {
    const {
      initialValues,
      updateSearchParams,
      doResetSearch,
      showExtraButtons,
      autoSuggestOnChange,
      address,
      region,
    } = this.props;

    return (
      <Form
        onSubmit={this.onSubmit.bind(this)}
        initialValues={initialValues}
        render={({ handleSubmit, form, submitting, pristine }) => (
          <form onSubmit={handleSubmit}>
            <div>
              <AutoSuggest
                updateSearchParams={updateSearchParams}
                autoSuggestOnChange={autoSuggestOnChange}
                address={address ? address : region}
              />
            </div>
            <div>
              <Field name="keyword" component="input" type="text" placeholder="Enter topic or organisation" />
            </div>
            {address
              ? (
                <div className="radio-group">
                  <fieldset className="radiusFieldset">
                  <legend>Distance (km):</legend>
                    {radiusOptions.map(radius => {
                      return (
                        <label className="radiusLabel" key={radius}>
                          <Field name="radius" component="input" type="radio" value={radius} />
                          {radius}
                        </label>
                      );
                    })}
                  </fieldset>
              </div> )
              : null
            }
            <button type="submit" disabled={submitting || pristine}>
              Search
            </button>
            {showExtraButtons ? (
              <button type="button" onClick={() => doResetSearch(form)} disabled={submitting}>
                Reset Search
              </button>
            ) : null}
          </form>
        )}
      />
    );
  }
}
