/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-floating-promises */
import * as React from 'react';
import styles from './ClassifiedAds.module.scss';
import { IClassifiedAdsProps } from './IClassifiedAdsProps';
import Carousel from 'react-bootstrap/Carousel';
import "bootstrap/dist/css/bootstrap";
import { IFile, IResponseItem } from "../../../interface";
import { getSP } from '../../services/pnpjsConfig';
import { SPFI } from '@pnp/sp';
import { Logger, LogLevel } from "@pnp/logging";
import { Button, Card } from 'react-bootstrap';

export interface IClassifiedAdsListItem {
  title: string;
}
export interface IClassifiedsAdsState {
  items: IFile[];
  errors: string[];
}
export default class ClassifiedsAdsCard extends React.Component<IClassifiedAdsProps, IClassifiedsAdsState> {
  private LOG_SOURCE = "ClassifiedsAds";
  //private LIBRARY_NAME = "ClassifiedsAds";
  private _sp: SPFI;
  //private SPService: getSP = null;
  constructor(props: IClassifiedAdsProps) {
    super(props);
    this._sp = getSP();
    //this.SPService = new this.SPService(this.props.context);
    this.getCarouselItems = this.getCarouselItems.bind(this);
    this.state = {
      items: [],
      errors: []
    };
  }


  public getCarouselItems = async (): Promise<void> => {
    try {
      //const spCache = spfi(this._sp).using(Caching({ store: "session" }));
      const response: IResponseItem[] = await this._sp.web.lists
        .getByTitle(this.props.listName)
        .items
        .select("Id", "Title", "Descriptions", "FileLeafRef", "Start_Date", "End_Date" ,"File/Length")
        .expand("File/Length")();

      // use map to convert 
      const items: IFile[] = response.map((item: IResponseItem) => {
        return {
          Id: item.Id,
          Title: item.Title,
          Name: item.FileLeafRef,
          Descriptions: item.Descriptions,
          Start_Date: item.Start_Date,
          End_Date: item.End_Date
        };
      });
      //Add the items to the state
      this.setState({ items });

    } catch (err) {
      Logger.write(`${this.LOG_SOURCE} (getCarouselItems) - ${JSON.stringify(err)} - `, LogLevel.Error);
    }
  }
  public componentDidMount(): void {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    this.getCarouselItems();
  }

  public getLibrary = async (): Promise<void> => {
    try {
      window.location.href="../../ClassifiedsAds" 

    } catch (error) {
      Logger.write(`${this.LOG_SOURCE} (getLibrary) - ${JSON.stringify(error)} - `, LogLevel.Error);
    }

  }

  public render(): React.ReactElement<IClassifiedAdsProps> {
    // eslint-disable-next-line prefer-const
    let collection = this.state.items;
    console.log('Collection ', collection);
    return (
      <div className={styles.classifiedAds}>
        <Card style={{ width: '18rem' }}>
          <Carousel>
            {collection.length > 0 && collection.map((data: any) => {
              return (
                // eslint-disable-next-line react/jsx-key
                <Carousel.Item>
                  <Card.Body>
                    <Card.Title>{data.Title}</Card.Title>
                    <Card.Img variant='top' src={'../../ClassifiedsAds/' + data.Name} />
                    <Card.Text> {data.Descriptions}</Card.Text>
                    <Button variant='primary' onClick={() => { this.getLibrary() }}>Add Your Ads</Button>
                  </Card.Body>
                </Carousel.Item>
              );
            })}
          </Carousel>
        </Card>
      </div>
    );
  }
}
