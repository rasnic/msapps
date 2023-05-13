import './App.css';
import React, { useEffect, useState } from "react";
import {getData} from "./API/api"
import { useDispatch } from 'react-redux'
import store from './redux/store';
import { add } from './redux/reducer';
import {Row,Col,Container,Button,Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
function App() {
  const [catagory,setCatagory] = useState('sport');
  const [catagoryModal,setCatagoryModal] = useState(false);
  const [imageModal,setImageModal] = useState(false);
  const [imageData,setImageData] = useState()
  const [catagoryData,setCatagoryData] = useState([]);
  const [displayedData,setDisplayedData] = useState([]);
  const [pagination,setPagination] = useState(0);
  const dispatch = useDispatch()
  const catagories = ['sport','animals','work']
  useEffect(() => {
    getInitData(catagory)
  })

  async function getInitData(cata){
    //get data if catagory is missing from store
    if (!Object.keys(store.getState().data.value).find(c => c === cata)) {
      const data = await getData(cata);
      setCatagoryData(Object.values(data)[0])
      dispatch(add(data))
    } else{
      setCatagoryData(store.getState().data.value[cata]);
    }
  }
  
  useEffect(() => {
    if(catagoryData.length > 0){
      if ((pagination+1) * 9 > catagoryData.length) {
        const displayedImages = catagoryData.slice(pagination*9, catagoryData.length)
        setDisplayedData(displayedImages)
      } else{
        const displayedImages = catagoryData.slice(pagination*9, (pagination+1)*9)
        setDisplayedData(displayedImages)
      }
    }
  },[pagination,catagoryData])

  function changeCatagory(cata){
    setCatagory(cata)
    getInitData(cata)
  }

  function openImageModal(item){
    const image = Object.entries(item)
    setImageData(image)
    setImageModal(true)
  }

  return (
    <Container className="center">
      {catagoryData.length > 0 && displayedData.length > 0 &&
        <>
        <Row className='mt-3'>
          <Col sm={1}><Button disabled={pagination === 0} onClick={() => setPagination(pagination - 1)}>prev</Button></Col>
          <Col sm={10} className="midSelector"><Button className="selectBtn" onClick={() => setCatagoryModal(true)}>select catagory</Button></Col>
          <Col sm={1}><Button disabled={displayedData.length < 9} onClick={() => setPagination(pagination + 1)}>next</Button></Col>
        </Row>
        <Row>
          {displayedData.map((item) =>{
            return(<Col sm={4} key={item.id}>
              <img src={item.largeImageURL} alt="" className='cursor-pointer' onClick={() => openImageModal(item)}></img>
            </Col>)
          })}
        </Row></>
      }
    {catagoryModal ? <Modal width="90%" isOpen={catagoryModal}>
      <ModalHeader>select catagory</ModalHeader>
      <ModalBody className='center justify-items-center'><select
                                            className="ml-2 mr-2"
                                            value={catagory}
                                            onChange={(event) => {
                                              changeCatagory(event.target.value);
                                            }}>
                                            {catagories.map((e) => {
                                                return <option key={e} value={e}>{e}</option>;
                                            })}
                                        </select></ModalBody>
      <ModalFooter><Button onClick={() => setCatagoryModal(false)}>close</Button></ModalFooter>
    </Modal>:<></>}
    {imageModal ? <Modal isOpen={imageModal}>
    <ModalHeader>image information</ModalHeader>
      <div>{imageData.map((item) => {
        return(<Row className='mt-1' style={{marginLeft:'10px'}} key={item[0]}><Col sm={2} className='font-weight-bold'>{item[0]}:</Col> <Col sm={10}>{item[1]}</Col></Row>)
      })}</div>
      <ModalFooter><Button onClick={() => setImageModal(false)}>close</Button></ModalFooter>
    </Modal>:<></>}
    </Container>
  );
}

export default App;
