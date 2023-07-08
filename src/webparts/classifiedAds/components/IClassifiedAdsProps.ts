/* eslint-disable @typescript-eslint/no-explicit-any */
import { WebPartContext } from "@microsoft/sp-webpart-base";
export interface IClassifiedAdsProps {
  description: string;
  listName: string;
  absoluteURL: any;
  spHttpClient: any;
  context: WebPartContext;
}
