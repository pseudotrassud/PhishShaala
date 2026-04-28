// GET /api/questions
// Sends all 10 scenarios to the client — no answers included.

const SCENARIOS = [
    {
        id: 1, type: 'email', title: 'HDFC KYC Update', status: 'Active',
        sender: 'HDFC Bank Alert', email: 'hdfc-support@kyc-verification.in',
        subject: 'URGENT: Update PAN/Aadhar to avoid account freeze',
        content: 'Dear Customer, <br><br> As per RBI guidelines, your KYC details are pending update. Your account will be frozen within 24 hours if you do not complete the verification. <br><br> Update your PAN and Aadhar details immediately via the link below to continue banking services seamlessly.',
        linkText: 'Update KYC Now', date: 'Today, 10:30 AM',
    },
    {
        id: 2, type: 'email', title: 'IT Refund Notice', status: 'Pending',
        sender: 'IT Department', email: 'refunds@it-dept-gov.in',
        subject: 'Refund Approved: ₹15,420 Pending Disbursement',
        content: 'Dear Taxpayer, <br><br> We are pleased to inform you that your Income Tax Refund of ₹15,420 for the assessment year 2023-24 has been approved. <br><br> However, we need you to confirm your bank account details to process the transfer. Click the button below to claim your refund immediately.',
        linkText: 'Claim Refund Now', date: 'Yesterday, 4:15 PM',
    },
    {
        id: 3, type: 'email', title: 'Zomato Refund', status: 'Pending',
        sender: 'Zomato Support', email: 'support@zomato.com',
        subject: 'Refund Processed for Order #ZM99281',
        content: 'Hi there, <br><br> We are sorry your order was delivered late. As promised, we have initiated a refund of ₹85 to your original payment source. <br><br> It should reflect in your account within 5-7 business days. We hope to serve you better next time!',
        linkText: 'View Order Details', date: 'Today, 1:20 PM',
    },
    {
        id: 4, type: 'email', title: 'Amazon Job Offer', status: 'Pending',
        sender: 'Amazon HR Team', email: 'hr-recruitment@amazon-india-careers.com',
        subject: 'Job Offer: WFH Opportunity @ ₹45,000/month',
        content: 'Dear Candidate, <br><br> Your resume has been shortlisted for a part-time Work From Home role at Amazon India. Earn up to ₹45,000/month with flexible hours. <br><br> To schedule your interview and secure your spot, please pay a refundable registration fee of ₹999.',
        linkText: 'Register & Pay Fee', date: '2 days ago, 9:00 AM',
    },
    {
        id: 5, type: 'email', title: 'Microsoft Alert', status: 'Pending',
        sender: 'Microsoft Security', email: 'account-security@microsoft.com',
        subject: 'Security alert: New sign-in from Bangalore',
        content: 'We detected a new sign-in to your Microsoft account. <br><br> Device: Windows 10 <br> Location: Bangalore, Karnataka <br> Time: Just now <br><br> If this was you, you can ignore this email. If not, please review your recent activity immediately.',
        linkText: 'Review Activity', date: 'Just now',
    },
    {
        id: 6, type: 'sms', title: 'SBI Rewards', status: 'Pending',
        sender: 'SBI-BNK',
        msg: 'Your SBI Reward points worth ₹4999 are expiring today. Redeem now at sbi-reward-portal.online to get cash or gifts.',
        date: 'Today 11:45 AM',
    },
    {
        id: 7, type: 'sms', title: 'BlueDart Delay', status: 'Pending',
        sender: 'BZ-BLDART',
        msg: 'Your BlueDart package 772314 is delayed due to incomplete address. Update your address at bluedart-tracking.net to ensure delivery by tomorrow.',
        date: 'Today 2:30 PM',
    },
    {
        id: 8, type: 'sms', title: 'Swiggy OTP', status: 'Pending',
        sender: 'AX-SWIGGY',
        msg: '123456 is your OTP for Swiggy login. Do not share it with anyone. Valid for 10 minutes.',
        date: 'Today 7:15 PM',
    },
    {
        id: 9, type: 'sms', title: 'Netflix Payment', status: 'Pending',
        sender: 'VK-NETFLX',
        msg: 'Your Netflix subscription has failed. Update payment at netflix-billing.co.in to avoid service disruption.',
        date: 'Yesterday 8:00 AM',
    },
    {
        id: 10, type: 'sms', title: 'Jio Data Offer', status: 'Pending',
        sender: 'JM-JIOOFF',
        msg: 'Congratulations! You won 50GB free data as part of our festive offer. Claim at jio-offers.link before it expires!',
        date: 'Today 10:00 AM',
    },
];

module.exports = function handler(req, res) {
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' });
    }
    // Cache for an hour — questions never change at runtime
    res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate');
    return res.status(200).json(SCENARIOS);
};
