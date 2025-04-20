import React from 'react';
import { Link } from 'react-router-dom';
import { 
  FundProjectionScreenOutlined, 
  UserAddOutlined, 
  UsergroupAddOutlined, 
  FileDoneOutlined, 
  SolutionOutlined, 
  FormOutlined,
  ArrowRightOutlined,
  CheckCircleFilled
} from '@ant-design/icons';
import { BsPeople } from 'react-icons/bs';
import './OverviewPage.css';

const OverviewPage = () => {
  return (
    <div className="overview-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <h1>Shepherd CRM</h1>
          <p className="subtitle">Transforming Customer Relationships into Business Growth</p>
          <div className="hero-buttons">
            <Link to="/" className="primary-btn">Get Started</Link>
            <a href="#features" className="secondary-btn">Explore Features</a>
          </div>
        </div>
      </section>

      {/* CRM Diagram Section */}
      <section className="crm-diagram-section">
        <div className="container">
          <h2>How Shepherd CRM Works</h2>
          <div className="crm-process">
            <div className="process-step">
              <div className="step-number">1</div>
              <div className="step-icon lead-icon">
                <UserAddOutlined />
              </div>
              <h3>Lead Capture</h3>
              <p>Collect and organize potential customers</p>
            </div>
            <div className="process-arrow">
              <ArrowRightOutlined />
            </div>
            <div className="process-step">
              <div className="step-number">2</div>
              <div className="step-icon nurture-icon">
                <BsPeople />
              </div>
              <h3>Nurture</h3>
              <p>Develop relationships and track interactions</p>
            </div>
            <div className="process-arrow">
              <ArrowRightOutlined />
            </div>
            <div className="process-step">
              <div className="step-number">3</div>
              <div className="step-icon convert-icon">
                <UsergroupAddOutlined />
              </div>
              <h3>Convert</h3>
              <p>Transform leads into paying clients</p>
            </div>
            <div className="process-arrow">
              <ArrowRightOutlined />
            </div>
            <div className="process-step">
              <div className="step-number">4</div>
              <div className="step-icon manage-icon">
                <FundProjectionScreenOutlined />
              </div>
              <h3>Manage & Grow</h3>
              <p>Maintain relationships and expand business</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section with Zig-Zag layout */}
      <section id="features" className="features-section">
        <div className="container">
          <h2>Everything You Need to Manage Client Relationships</h2>
          
          {/* Feature 1: Lead Management */}
          <div className="feature-row">
            <div className="feature-content">
              <span className="feature-tag">Lead Management</span>
              <h3>Capture and Nurture New Opportunities</h3>
              <p>Turn prospects into clients with our comprehensive lead management tools. Easily add individual leads or import in bulk to kickstart your sales pipeline.</p>
              <ul className="feature-list">
                <li><CheckCircleFilled /> Individual lead registration with detailed profiles</li>
                <li><CheckCircleFilled /> Bulk lead import for efficient data entry</li>
                <li><CheckCircleFilled /> Automated lead scoring and prioritization</li>
                <li><CheckCircleFilled /> Lead status tracking and follow-up reminders</li>
              </ul>
              <div className="feature-tools">
                <span className="tool-tag"><UserAddOutlined /> Add Lead</span>
                <span className="tool-tag"><BsPeople /> Bulk Lead</span>
              </div>
            </div>
            <div className="feature-illustration">
              <div className="illustration-container lead-illustration">
                <svg viewBox="0 0 240 200" xmlns="http://www.w3.org/2000/svg">
                  {/* Funnel */}
                  <path d="M40 30 L200 30 L170 100 L70 100 Z" fill="#EDE9FE" stroke="#7C3AED" strokeWidth="2" />
                  <path d="M70 100 L170 100 L140 170 L100 170 Z" fill="#DDD6FE" stroke="#7C3AED" strokeWidth="2" />
                  
                  {/* People icons */}
                  <circle cx="60" cy="15" r="10" fill="#A78BFA" />
                  <rect x="55" cy="25" width="10" height="15" fill="#A78BFA" />
                  
                  <circle cx="90" cy="15" r="10" fill="#A78BFA" />
                  <rect x="85" cy="25" width="10" height="15" fill="#A78BFA" />
                  
                  <circle cx="120" cy="15" r="10" fill="#A78BFA" />
                  <rect x="115" cy="25" width="10" height="15" fill="#A78BFA" />
                  
                  <circle cx="150" cy="15" r="10" fill="#A78BFA" />
                  <rect x="145" cy="25" width="10" height="15" fill="#A78BFA" />
                  
                  <circle cx="180" cy="15" r="10" fill="#A78BFA" />
                  <rect x="175" cy="25" width="10" height="15" fill="#A78BFA" />
                  
                  {/* Client icon at bottom */}
                  <circle cx="120" cy="185" r="12" fill="#7C3AED" />
                  <rect x="114" cy="197" width="12" height="18" fill="#7C3AED" />
                  
                  {/* Labels */}
                  <text x="120" y="65" textAnchor="middle" fill="#4C1D95" fontWeight="bold" fontSize="12">Leads</text>
                  <text x="120" y="135" textAnchor="middle" fill="#4C1D95" fontWeight="bold" fontSize="12">Prospects</text>
                  <text x="120" y="185" textAnchor="middle" fill="white" fontWeight="bold" fontSize="10">Client</text>
                </svg>
              </div>
            </div>
          </div>
          
          {/* Feature 2: Client Management */}
          <div className="feature-row reverse">
            <div className="feature-content">
              <span className="feature-tag">Client Management</span>
              <h3>Build Strong Client Relationships</h3>
              <p>Manage your entire client roster from a single dashboard. Create detailed client profiles, track important information, and nurture long-term business relationships.</p>
              <ul className="feature-list">
                <li><CheckCircleFilled /> Comprehensive client profiles and history</li>
                <li><CheckCircleFilled /> Customizable client categories and tags</li>
                <li><CheckCircleFilled /> Communication tracking and interaction notes</li>
                <li><CheckCircleFilled /> Visual client lifecycle management</li>
              </ul>
              <div className="feature-tools">
                <span className="tool-tag"><UserAddOutlined /> Add Client</span>
                <span className="tool-tag"><UsergroupAddOutlined /> Client List</span>
              </div>
            </div>
            <div className="feature-illustration">
              <div className="illustration-container client-illustration">
                <svg viewBox="0 0 240 200" xmlns="http://www.w3.org/2000/svg">
                  {/* Client card background */}
                  <rect x="20" y="20" width="200" height="160" rx="8" fill="#EDE9FE" stroke="#7C3AED" strokeWidth="2" />
                  
                  {/* Card header */}
                  <rect x="20" y="20" width="200" height="40" rx="8" fill="#7C3AED" />
                  <circle cx="50" cy="40" r="15" fill="#A78BFA" />
                  <rect x="75" y="30" width="80" height="8" rx="2" fill="white" />
                  <rect x="75" y="45" width="50" height="6" rx="2" fill="#A78BFA" />
                  
                  {/* Card content */}
                  <rect x="35" y="75" width="170" height="1" fill="#A78BFA" />
                  
                  <rect x="35" y="85" width="60" height="8" rx="2" fill="#A78BFA" />
                  <rect x="35" y="100" width="100" height="6" rx="2" fill="#C4B5FD" />
                  
                  <rect x="35" y="115" width="60" height="8" rx="2" fill="#A78BFA" />
                  <rect x="35" y="130" width="100" height="6" rx="2" fill="#C4B5FD" />
                  
                  <rect x="35" y="145" width="60" height="8" rx="2" fill="#A78BFA" />
                  <rect x="35" y="160" width="100" height="6" rx="2" fill="#C4B5FD" />
                  
                  {/* Rating stars */}
                  <polygon points="160,85 165,95 175,97 167,105 169,115 160,110 151,115 153,105 145,97 155,95" fill="#7C3AED" />
                  <polygon points="185,85 190,95 200,97 192,105 194,115 185,110 176,115 178,105 170,97 180,95" fill="#C4B5FD" />
                </svg>
              </div>
            </div>
          </div>
          
          {/* Feature 3: Business Tools */}
          <div className="feature-row">
            <div className="feature-content">
              <span className="feature-tag">Business Tools</span>
              <h3>Streamline Your Operations</h3>
              <p>Manage the financial side of customer relationships with professional invoicing, subscription management, and custom template creation tools.</p>
              <ul className="feature-list">
                <li><CheckCircleFilled /> Professional invoice generation and tracking</li>
                <li><CheckCircleFilled /> Subscription package management</li>
                <li><CheckCircleFilled /> Custom document templates</li>
                <li><CheckCircleFilled /> Automated payment reminders</li>
              </ul>
              <div className="feature-tools">
                <span className="tool-tag"><FileDoneOutlined /> Invoice</span>
                <span className="tool-tag"><SolutionOutlined /> Subscription</span>
                <span className="tool-tag"><FormOutlined /> Templates</span>
              </div>
            </div>
            <div className="feature-illustration">
              <div className="illustration-container invoice-illustration">
                <svg viewBox="0 0 240 200" xmlns="http://www.w3.org/2000/svg">
                  {/* Invoice */}
                  <rect x="40" y="20" width="160" height="160" rx="2" fill="#EDE9FE" stroke="#7C3AED" strokeWidth="2" />
                  
                  {/* Header */}
                  <rect x="60" y="35" width="120" height="15" rx="2" fill="#7C3AED" />
                  
                  {/* Content */}
                  <rect x="60" y="60" width="50" height="8" rx="1" fill="#A78BFA" />
                  <rect x="140" y="60" width="40" height="8" rx="1" fill="#A78BFA" />
                  
                  <line x1="60" y1="75" x2="180" y2="75" stroke="#C4B5FD" strokeWidth="1" />
                  
                  <rect x="60" y="85" width="80" height="6" rx="1" fill="#C4B5FD" />
                  <rect x="150" y="85" width="30" height="6" rx="1" fill="#C4B5FD" />
                  
                  <rect x="60" y="95" width="80" height="6" rx="1" fill="#C4B5FD" />
                  <rect x="150" y="95" width="30" height="6" rx="1" fill="#C4B5FD" />
                  
                  <rect x="60" y="105" width="80" height="6" rx="1" fill="#C4B5FD" />
                  <rect x="150" y="105" width="30" height="6" rx="1" fill="#C4B5FD" />
                  
                  <line x1="60" y1="120" x2="180" y2="120" stroke="#A78BFA" strokeWidth="1" />
                  
                  <rect x="60" y="130" width="50" height="8" rx="1" fill="#A78BFA" />
                  <rect x="150" y="130" width="30" height="8" rx="1" fill="#7C3AED" />
                  
                  {/* Payment stamp */}
                  <rect x="130" y="150" width="50" height="20" rx="10" stroke="#7C3AED" strokeWidth="2" fill="none" />
                  <text x="155" y="164" textAnchor="middle" fill="#7C3AED" fontWeight="bold" fontSize="10">PAID</text>
                </svg>
              </div>
            </div>
          </div>
          
          {/* Feature 4: Analytics & Dashboard */}
          <div className="feature-row reverse">
            <div className="feature-content">
              <span className="feature-tag">Analytics & Dashboard</span>
              <h3>Make Data-Driven Decisions</h3>
              <p>Gain valuable insights into your business performance with comprehensive analytics and reporting tools, all accessible from your personalized dashboard.</p>
              <ul className="feature-list">
                <li><CheckCircleFilled /> Visual sales and lead conversion metrics</li>
                <li><CheckCircleFilled /> Revenue forecasting and tracking</li>
                <li><CheckCircleFilled /> Client acquisition cost analysis</li>
                <li><CheckCircleFilled /> Performance trends and comparisons</li>
              </ul>
              <div className="feature-tools">
                <span className="tool-tag"><FundProjectionScreenOutlined /> Dashboard</span>
              </div>
            </div>
            <div className="feature-illustration">
              <div className="illustration-container dashboard-illustration">
                <svg viewBox="0 0 240 200" xmlns="http://www.w3.org/2000/svg">
                  {/* Dashboard screen */}
                  <rect x="20" y="20" width="200" height="160" rx="5" fill="#EDE9FE" stroke="#7C3AED" strokeWidth="2" />
                  
                  {/* Chart 1: Bar chart */}
                  <rect x="35" y="40" width="85" height="65" rx="3" fill="white" stroke="#C4B5FD" strokeWidth="1" />
                  <rect x="45" y="75" width="10" height="20" fill="#A78BFA" />
                  <rect x="60" y="65" width="10" height="30" fill="#7C3AED" />
                  <rect x="75" y="55" width="10" height="40" fill="#A78BFA" />
                  <rect x="90" y="50" width="10" height="45" fill="#7C3AED" />
                  <line x1="40" y1="95" x2="115" y2="95" stroke="#C4B5FD" strokeWidth="1" />
                  
                  {/* Chart 2: Line chart */}
                  <rect x="35" y="115" width="85" height="65" rx="3" fill="white" stroke="#C4B5FD" strokeWidth="1" />
                  <polyline points="45,155 60,140 75,145 90,125 105,135" stroke="#7C3AED" strokeWidth="2" fill="none" />
                  <circle cx="45" cy="155" r="3" fill="#7C3AED" />
                  <circle cx="60" cy="140" r="3" fill="#7C3AED" />
                  <circle cx="75" cy="145" r="3" fill="#7C3AED" />
                  <circle cx="90" cy="125" r="3" fill="#7C3AED" />
                  <circle cx="105" cy="135" r="3" fill="#7C3AED" />
                  <line x1="40" y1="165" x2="115" y2="165" stroke="#C4B5FD" strokeWidth="1" />
                  
                  {/* Stats panel */}
                  <rect x="130" y="40" width="85" height="140" rx="3" fill="white" stroke="#C4B5FD" strokeWidth="1" />
                  
                  {/* Stat 1 */}
                  <rect x="140" y="50" width="65" height="25" rx="3" fill="#F5F3FF" />
                  <text x="145" y="65" fill="#7C3AED" fontSize="10">Leads</text>
                  <text x="195" y="68" textAnchor="end" fill="#4C1D95" fontSize="14" fontWeight="bold">124</text>
                  
                  {/* Stat 2 */}
                  <rect x="140" y="85" width="65" height="25" rx="3" fill="#F5F3FF" />
                  <text x="145" y="100" fill="#7C3AED" fontSize="10">Clients</text>
                  <text x="195" y="103" textAnchor="end" fill="#4C1D95" fontSize="14" fontWeight="bold">86</text>
                  
                  {/* Stat 3 */}
                  <rect x="140" y="120" width="65" height="25" rx="3" fill="#F5F3FF" />
                  <text x="145" y="135" fill="#7C3AED" fontSize="10">Revenue</text>
                  <text x="195" y="138" textAnchor="end" fill="#4C1D95" fontSize="14" fontWeight="bold">$24K</text>
                  
                  {/* Stat 4 */}
                  <rect x="140" y="155" width="65" height="15" rx="3" fill="#7C3AED" />
                  <text x="172" y="165" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">VIEW ALL</text>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Why Choose Us Section */}
      <section className="why-choose-section">
        <div className="container">
          <h2>Why Choose Shepherd CRM?</h2>
          <div className="benefits-grid">
            <div className="benefit-card">
              <div className="benefit-icon">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12Z" stroke="#7C3AED" strokeWidth="2"/>
                  <path d="M16 12L10 16.3301L10 7.66987L16 12Z" fill="#7C3AED"/>
                </svg>
              </div>
              <h3>All-in-One Solution</h3>
              <p>Manage your entire customer relationship lifecycle from lead to invoice with one integrated platform.</p>
            </div>
            
            <div className="benefit-card">
              <div className="benefit-icon">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8 12.5L11 15.5L16 9.5" stroke="#7C3AED" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#7C3AED" strokeWidth="2"/>
                </svg>
              </div>
              <h3>Time Efficiency</h3>
              <p>Automate repetitive tasks and streamline workflows to focus more on building client relationships.</p>
            </div>
            
            <div className="benefit-card">
              <div className="benefit-icon">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16 4C16.5523 4 17 4.44772 17 5V19C17 19.5523 16.5523 20 16 20H8C7.44772 20 7 19.5523 7 19V5C7 4.44772 7.44772 4 8 4" stroke="#7C3AED" strokeWidth="2"/>
                  <rect x="10" y="4" width="4" height="4" rx="1" fill="#7C3AED"/>
                  <line x1="10" y1="12" x2="14" y2="12" stroke="#7C3AED" strokeWidth="2" strokeLinecap="round"/>
                  <line x1="10" y1="16" x2="14" y2="16" stroke="#7C3AED" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
              <h3>Easy Organization</h3>
              <p>Keep all client information, communication history, and documents organized in one accessible place.</p>
            </div>
            
            <div className="benefit-card">
              <div className="benefit-icon">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2 9.5H22M9 3V21M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" stroke="#7C3AED" strokeWidth="2"/>
                </svg>
              </div>
              <h3>Growth Insights</h3>
              <p>Leverage data analytics to uncover business opportunities and make informed strategic decisions.</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <h2>Ready to Transform Your Business?</h2>
          <p>Join thousands of businesses using Shepherd CRM to grow their client relationships</p>
          <Link to="/" className="cta-button">Get Started Today</Link>
        </div>
      </section>
    </div>
  );
};

export default OverviewPage;