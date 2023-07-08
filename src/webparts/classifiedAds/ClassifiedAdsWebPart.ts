/* eslint-disable @microsoft/spfx/pair-react-dom-render-unmount */
/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { getSP } from '../services/pnpjsConfig';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import ClassifiedAds from './components/ClassifiedAds';
import { IClassifiedAdsProps } from './components/IClassifiedAdsProps';
export interface IClassifiedAdsWebPartProps {
  description: string;
  listName: string;
  absoluteURL: any;
  spHttpClient: any;
}

export default class ClassifiedAdsWebPart extends BaseClientSideWebPart<IClassifiedAdsWebPartProps> {


  public render(): void {
    const element: React.ReactElement<IClassifiedAdsProps> = React.createElement(
      ClassifiedAds,
      {
        description: this.properties.description,
        listName: this.properties.listName,
        absoluteURL: this.context.pageContext.web.absoluteUrl,
        spHttpClient: this.properties.listName,
        context: this.context
      }
    );

    ReactDom.render(element, this.domElement);
  }

/**
* Initialize the web part.
*/
public async onInit(): Promise<void> {

  await super.onInit();

  //Initialize our _sp object that we can then use in other packages without having to pass around the context.
  // Check out pnpjsConfig.ts for an example of a project setup file.
  getSP(this.context);
}

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: "Advertising Carousel"
          },
          groups: [
            {
              groupFields: [
                PropertyPaneTextField('listName', {
                  label: "Assign a list name"
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
