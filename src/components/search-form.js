import React, { Component } from 'react';
import { Form, Field } from 'react-final-form';
import PropTypes from 'prop-types';
import AutoSuggest from '../containers/auto-suggest'

export default class SearchForm extends Component {
  static propTypes = {
    updateSearchParams: PropTypes.func.isRequired,
    doResetSearch: PropTypes.func.isRequired,
    showExtraButtons: PropTypes.bool.isRequired, 
    autoSuggestOnChange: PropTypes.func.isRequired, 
    autoSuggestValue: PropTypes.string.isRequired
  };

  render() {
    const { updateSearchParams, doResetSearch, showExtraButtons, autoSuggestOnChange, autoSuggestValue } = this.props

    return (
      <Form
        onSubmit={updateSearchParams}
        render={({ handleSubmit, form, submitting, pristine }) => (
          <form onSubmit={handleSubmit}>
            <div>
              <Field
                name='keyword'
                component='input'
                type='text'
                placeholder='Enter topic or organisations'
              />
            </div>
            <div>
              <AutoSuggest
                updateSearchParams={updateSearchParams}
                autoSuggestOnChange={autoSuggestOnChange}
                autoSuggestValue={autoSuggestValue}
              />
            </div>
            <button type='submit' disabled={submitting || pristine}>
              Search
            </button>
            { showExtraButtons
              ? <button
                  type='button'
                  onClick={() => doResetSearch(form)}
                  disabled={submitting}
                >
                  Reset form
                </button>
              : null
            }
          </form>
        )}
      />
    );
  }}