import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './Lifestyle.css';
import genlige from '../Asserts/genlige.png';
import bag from '../Asserts/bag.svg';
import search from '../Asserts/search.svg';
import Envelope from '../Asserts/envelope.svg';
import Facebook from '../Asserts/facebook.svg';
import Instagram from '../Asserts/instagram.svg';
import Youtube from '../Asserts/youtube.svg';
import { fetchLifeStyle } from '../Reducer/lifestyleSlice';
import { fetchRewards } from '../Reducer/rewardsSlice';
import { fetchEarnings } from '../Reducer/earningsSlice';
import RewardsSummary from "../Component/rewardsSummary";
import RewardsEarnings from "../Component/RewardsEarnings";
import DashBoard from "../Component/DashBoard";

const tabs = ['DashBoard', 'Rewards Summary', 'Earn and Redeem'];
const dataList = ['New', 'Women', 'Men', 'Girls', 'Boys', 'Baby & Toddler'];

const LifeStyle = () => {
    const dispatch = useDispatch();
    const [activeTab, setActiveTab] = useState('DashBoard');

    const isPendingLifestyle = useSelector((state) => state.lifestyle.isPendingLifestyle);
    const isErrorLifestyle = useSelector((state) => state.lifestyle.isErrorLifestyle);
    const lifestyleData = useSelector((state) => state.lifestyle.lifestyleData);
    const username = useSelector((state) => state.login.username);

    useEffect(() => {
        dispatch(fetchLifeStyle());
        dispatch(fetchRewards());
        dispatch(fetchEarnings());
    }, [dispatch]);

    if (isPendingLifestyle) return <p>Loading...</p>;
    if (isErrorLifestyle) return <p>Error loading lifestyle data</p>;
    if (!lifestyleData) return <p>No data available</p>;

    return (
        <div className="Lifestyle">
            <nav className="header">
                <div className="header_logo">
                    <img src={genlige} alt="Logo" />
                    <div className="header_class">
                        <div className="header_li">
                            <p>FREE SHIPPING ON $50+ FOR REWARDS MEMBERS</p>
                        </div>
                        <div className="header_list">
                            {dataList.map((item, index) => (
                                <h1 key={index}>{item}</h1>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="header-container">
                    <div className="user-section">
                        <div>
                            <div className="greeting">Hi, {username || 'Guest'}</div>
                            <div className="rewards-info">${lifestyleData?.rewards || '0.00'} in rewards</div>
                        </div>
                        <div className="icon-bag"><img src={bag} alt="Bag" /></div>
                    </div>

                    <div className="search-bar-wrapper">
                        <input className="search-input" type="text" placeholder="Search" />
                        <span className="search-icon"><img src={search} alt="Search" /></span>
                    </div>
                </div>
            </nav>

            <main className="main">
                <div className="menu">
                    <div className="reward-summary">
                        <p className="rew">Reward Dollars</p>
                        <p className="amount">$ {lifestyleData.rewards}</p>
                    </div>
                    <div className="tabs">
                        {tabs.map((tab) => (
                            <div
                                key={tab}
                                className={`tab-item ${activeTab === tab ? 'active' : ''}`}
                                onClick={() => setActiveTab(tab)}>
                                {tab}
                            </div>
                        ))}
                    </div>
                </div>

                {activeTab === 'DashBoard' && <DashBoard lifestyleData={lifestyleData} />}
                {activeTab === 'Rewards Summary' && <RewardsSummary />}
                {activeTab === 'Earn and Redeem' && <RewardsEarnings />}
            </main>

            <footer>
                <div className="footer">
                    <div className="flexcontent">
                        <div className="footer-left">
                            <img src={genlige} alt="lifestyle" className='img-logo-header' />
                            <p href="/terms">Terms & Conditions - Privacy Policy</p>
                        </div>

                        <div className="footer-center">
                            <img className="icon" src={Envelope} alt="Email" />
                            <span className='icon-span'>help@lifestyle.com</span>
                        </div>

                        <div className="footer-right">
                            <img className="icon" src={Facebook} alt="Facebook" />
                            <img className="icon" src={Instagram} alt="Instagram" />
                            <img className="icon" src={Youtube} alt="YouTube" />
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default LifeStyle;
