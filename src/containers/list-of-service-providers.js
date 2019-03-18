import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ServiceProvider from '../components/service-provider';
import uniqueServices from '../utilities/uniqueServices';

export default class ListOfServiceProviders extends Component {
  static propTypes = {
    serviceProviders: PropTypes.array.isRequired,
  };

  render() {
    const { 
      serviceProviders, 
      userLatitude, 
      userLongitude 
    } = this.props;

    if (serviceProviders.length > 0) {
      return (
        <section className="service__container">
          {uniqueServices(serviceProviders, 'PROVIDER_NAME').map((provider, index) => (
            <div>{index+1}
            <ServiceProvider
              key={`service_${index}`}
              fsdId={provider.FSD_ID}
              purpose={provider.ORGANISATION_PURPOSE}
              address={provider.PHYSICAL_ADDRESS}
              classification={provider.PROVIDER_CLASSIFICATION}
              contactAvailability={provider.PROVIDER_CONTACT_AVAILABILITY}
              name={provider.PROVIDER_NAME}
              website={provider.PROVIDER_WEBSITE_1}
              email={provider.PUBLISHED_CONTACT_EMAIL_1}
              phoneNumber={provider.PUBLISHED_PHONE_1}
              providerLatitude={provider.LATITUDE}
              providerLongitude={provider.LONGITUDE}
              userLatitude={userLatitude}
              userLongitude={userLongitude}
            /></div>
          ))}
        </section>
      );
    } else {
      return (
        <section className="service__container">
          <header className="service__header">
            <h2>Make a search or choose a category above.</h2>
          </header>
        </section>
      );
    }
  }
}
