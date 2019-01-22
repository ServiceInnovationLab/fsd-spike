import React, { Component } from 'react';
import { Form, Field } from 'react-final-form';
import PropTypes from 'prop-types';
import AutoSuggest from '../containers/auto-suggest'

export default class SearchForm extends Component {
  static propTypes = {
    doLoadResults: PropTypes.func.isRequired,
    doResetSearch: PropTypes.func.isRequired
  };

  render() {
    const { doLoadResults, doResetSearch, showExtraButtons, autoSuggestOnChange, autoSuggestValue } = this.props
    
    return (
      <Form
        onSubmit={doLoadResults}
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
              doLoadResults={doLoadResults}
              autoSuggestOnChange={autoSuggestOnChange}
              autoSuggestValue={autoSuggestValue} />
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
