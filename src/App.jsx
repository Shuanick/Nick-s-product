import React, { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { IoSearch, IoSettingsOutline, IoCloseCircleOutline } from 'react-icons/io5';
import { IoMdAddCircleOutline} from 'react-icons/io';
import { TbMessageCircle } from 'react-icons/tb';
import { FaRegBell } from 'react-icons/fa';
import { CgDetailsMore } from 'react-icons/cg';
import { AiOutlineAreaChart } from 'react-icons/ai';
import { PiTagChevronBold } from 'react-icons/pi';
import { RiBearSmileLine } from 'react-icons/ri';
import { AiOutlineHome } from "react-icons/ai";
import './App.css';
import Home from "./home.jsx";
import Message from "./message.jsx";
import Bell from "./bell.jsx";


function App() {
  const [selectedIcon, setSelectedIcon] = useState('home');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [showNicky, setShowNicky] = useState(true);

  const navigate = useNavigate();

  const handleIconClick = (iconName, event) => {
    event.stopPropagation();
    console.log(iconName);
    setSelectedIcon(iconName);
    if (iconName === 'home') {
      navigate('/');
      window.location.reload();
    }else if (iconName === 'more') {
      setIsModalOpen((pre)=>!pre);
    }else if (iconName === 'search') {
      setIsSearchOpen(true);
      setIsModalOpen(false);
      setShowNicky(false);
    }else if (iconName === 'message'){
      navigate('/message');
    }else if (iconName === 'bell'){
      navigate('/notification');
    }else if (iconName === 'add'){
      const modal = new window.bootstrap.Modal(document.getElementById('exampleModal'));
      modal.show();
    }else {
      setShowNicky(true);
    }
    
  };

  const iconStyle = (iconName) => ({
    fontSize: '20px',
    fontWeight: selectedIcon === iconName ? 'bold' : 'normal',
  });

  const handleModalClose = (event) => {
    if (!event.target.closest('.modal')) {
      if (isModalOpen) {
        setIsModalOpen(false);
      }
    }
    if (!event.target.closest('.search-modal')) {
      if (isSearchOpen) {
        setIsSearchOpen(false);
        setShowNicky(true);
      }
    }
  };

  const handleClear = () => {
    setSearchText('');
  };

  return (
    <div className="container1" onClick={handleModalClose}>
      <div className="list">
        <div className='title' onClick={(event) => handleIconClick('home',event)}>
          <div className={`title-transition ${showNicky ? 'title-visible' : 'title-hidden'}`}>Nicky</div>
          <div className={`bear ${showNicky ? 'icon-hidden' : 'icon-visible'}`}>
            <RiBearSmileLine />
          </div>
        </div>
        <div className="icons">
          <div className="icon" onClick={(event) => handleIconClick('home',event)}>
            <AiOutlineHome style={{ fontSize: '30px', margin: '10px' }} />
            <div className="icon-text" style={iconStyle('home')}>
              首頁
            </div>
          </div>
          <div className="icon" onClick={(event) => { handleIconClick('search', event) }}>
            <IoSearch style={{ fontSize: '30px', margin: '10px' }} />
            <div className="icon-text" style={iconStyle('search')}>
              搜尋
            </div>
          </div>
          <div className="icon" onClick={(event) => { handleIconClick('message', event) }}>
            <TbMessageCircle style={{ fontSize: '30px', margin: '10px' }} />
            <div className="icon-text" style={iconStyle('message')}>
              訊息
            </div>
          </div>
          <div className="icon" onClick={(event) => { handleIconClick('bell', event) }}>
            <FaRegBell style={{ fontSize: '30px', margin: '10px' }} />
            <div className="icon-text" style={iconStyle('bell')}>
              通知
            </div>
          </div>
          <div className="icon" onClick={(event) => { handleIconClick('add', event) }}>
            <IoMdAddCircleOutline style={{ fontSize: '30px', margin: '10px' }} />
            <div className="icon-text" style={iconStyle('add')}>
              建立
            </div>
          </div>
          <div className="iconLast" onClick={(event) => { handleIconClick('more', event) }}>
            <CgDetailsMore style={{ fontSize: '30px', margin: '10px' }} />
            <div className="icon-text" style={iconStyle('more')}>
              更多
            </div>
          </div>
        </div>
      </div>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/message" element={<Message />} />
            <Route path="/notification" element={<Bell />} />
        </Routes>
      {isModalOpen && (
        <div className="modal1">
          <div className="modal-content1">
            <IoSettingsOutline style={{ fontSize: '30px', margin: '10px' }} />
            <div className="icon-text">設定</div>
          </div>
          <div className="modal-content1">
            <AiOutlineAreaChart style={{ fontSize: '30px', margin: '10px' }} />
            <div className="icon-text">你的動態</div>
          </div>
          <div className="modal-content1" style={{ marginBottom: '5px' }}>
            <PiTagChevronBold style={{ fontSize: '30px', margin: '10px' }} />
            <div className="icon-text">我的珍藏</div>
          </div>
          <div style={{ backgroundColor: 'rgba(0,0,0,0.1)', height: '2px', width: '100%' }}></div>
          <div className="modal-content1" style={{marginTop:'5px'}}>
            <div className="icon-text">切換帳號</div>
          </div>
          <div className="modal-content1" style={{ marginBottom: '5px' }}>
            <div className="icon-text">登出</div>
          </div>
        </div>
      )}
      <div className={`search-modal ${isSearchOpen?'show':''}`} onClick={handleModalClose}>
        <div className="search-header">
          <h3 style={{margin:'25px',fontWeight:'bold'}}>搜尋</h3>
        </div>
        <div className="input-wrapper" onFocus={() => setIsFocused(true)} onBlur={() => setIsFocused(false)}>
            <input type="text" className={`searching ${(!isFocused && searchText)? 'placeholder-color' : ''}`} placeholder="搜尋" value={searchText} onChange={(e)=>setSearchText(e.target.value)} />
            {searchText && (
            <IoCloseCircleOutline className="clear-icon" onClick={handleClear} />
          )}  
        </div>
        <div style={{ backgroundColor: 'rgba(0,0,0,0.1)', height: '1px', width: '100%' ,marginTop:'40px'}}></div>
        <div style={{display:'flex',justifyContent:'flex-start',width:'100%',marginTop:'20px'}}>
          <h5 style={{marginLeft:'30px',fontWeight:'bold'}}>最近</h5>
        </div>
      </div>
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">建立新貼文</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              ...
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary">Save changes</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
