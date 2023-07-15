/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable eqeqeq */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-floating-promises */
import * as React from 'react';
import { IClassifiedAdsProps } from './IClassifiedAdsProps';
import styles from './ClassifiedAds.module.scss';
import "bootstrap/dist/css/bootstrap";
import { IFile, IResponseItem } from "../../../interface";
import { getSP } from '../../services/pnpjsConfig';
import { SPFI } from '@pnp/sp';
import { Logger, LogLevel } from "@pnp/logging";
import { Button, Card, Col, Container, Row } from 'react-bootstrap';

export interface IClassifiedAdsListItem {
  title: string;
}
export interface IClassifiedsAdsState {
  items: IFile[];
  errors: string[];
}
const ClassifiedAds: React.FunctionComponent<IClassifiedAdsProps> = (props) => {
  let LOG_SOURCE = "ClassifiedsAds";
  let _sp:SPFI = getSP(props.context)

  const [cardItems, setCardItems] = React.useState<IFile[]>([])
 // const [readMore,setReadMore]=React.useState(false);
  //const linkName=readMore?'Read Less << ':'Read More >> '
  const columnsPerRow = 3;

  const getCardItems =async () => {
    try {
       console.log('context', _sp)
       const response: IResponseItem[] = await _sp.web.lists
       .getByTitle(props.listName)
       .items
       .select("Id", "Title", "Descriptions", "FileLeafRef", "Start_Date", "End_Date" ,"File/Length")
       .expand("File/Length")();

       //use map to convert
       setCardItems((await response).map((item: IResponseItem) => {
        return{
          Id: item.Id,
          Title: item.Title,
          Name: item.FileLeafRef,
          Descriptions: item.Descriptions,
          Start_Date: item.Start_Date,
          End_Date: item.End_Date
        };
       }));
       
    } catch (err) {
      Logger.write(`${LOG_SOURCE} (getCarouselItems) - ${JSON.stringify(err)} - `, LogLevel.Error);
    }
  }

  React.useEffect(() => {
    if (props.listName && props.listName != "") {
      getCardItems();
    }
  },[props])
  
  const getLibrary = async (): Promise<void> => {
    try {
      window.location.href="../../ClassifiedsAds" 

    } catch (error) {
      Logger.write(`${LOG_SOURCE} (getLibrary) - ${JSON.stringify(error)} - `, LogLevel.Error);
    }

  }

  const renderCard = ()=>{
    let colldata = cardItems.map((cards, index) => {
      return (
        // eslint-disable-next-line react/jsx-key
        <div className={styles.classifiedAds}>
        <Col>
        <Card style={{ width: '14rem' }} key={index} className={styles.card}>
          <Card.Body style={{height: '18.5rem'}}>
            <Card.Img className={styles['card-img-top']} variant='top' src={'../../ClassifiedsAds/' + cards.Name} />
            <Card.Title className={styles['card-title']}>{cards.Title}</Card.Title>
            <Card.Text className={styles['card-text']}> {cards.Descriptions}</Card.Text>
          </Card.Body>
          </Card>
         </Col>
        </div>
      );

    });

    return colldata;
  }
  return (
    
    <Container className={styles.container}>
        <div className={styles.button}>
          <Button variant='primary' onClick={() => { getLibrary() }}>Place Your Ads</Button>
          </div>
      <Row xs={1} md={columnsPerRow}>
        {renderCard()}
      </Row>
    </Container>

  );
};
export default ClassifiedAds;