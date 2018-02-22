import React, { PureComponent } from 'react';

export default class PageHeader extends PureComponent {
  conversionBreadcrumbList() {
    return null;
  }

  render() {
    const breadcrumb = this.conversionBreadcrumbList();

    return (
      <div>
        {breadcrumb}
      </div>
    );
  }
}