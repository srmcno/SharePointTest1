import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import BioAssessmentForm, { IBioAssessmentFormProps } from './components/BioAssessmentForm';
import { initSP } from './services/SharePointService';

export interface IBioAssessmentWebPartProps {
  listName: string;
  siteUrl: string;
}

export default class BioAssessmentWebPart extends BaseClientSideWebPart<IBioAssessmentWebPartProps> {
  public async onInit(): Promise<void> {
    await super.onInit();
    initSP(this.context);
  }

  public render(): void {
    const element: React.ReactElement<IBioAssessmentFormProps> = React.createElement(
      BioAssessmentForm,
      {
        listName: this.properties.listName || 'BioAssessments',
        siteUrl: this.context.pageContext.web.absoluteUrl
      }
    );
    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: { description: 'Bio Assessment Web Part Settings' },
          groups: [
            {
              groupName: 'SharePoint Settings',
              groupFields: [
                PropertyPaneTextField('listName', {
                  label: 'List Name',
                  description: 'SharePoint list where assessments are stored (default: BioAssessments)',
                  value: this.properties.listName || 'BioAssessments'
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
