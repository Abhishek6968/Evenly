const express=require('express');
const router=express.Router();
router.use(express.json());
router.use(express.urlencoded({extended:true}));
const Event=require('../models/eventData')
router.get('/getAllEvents' ,async (req, res) => {
    try {
        const events = await Event.find(); // Fetch all events
        res.status(200).json(events);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch events' });
    }
});

// Approve an event
router.put('/approveEvent/:id',async (req, res) => {
    try {
        const { id } = req.params;
        const event = await Event.findByIdAndUpdate(id, { status: 'approved', 'approvalHistory.approvedAt': new Date() }, { new: true });
        
        if (!event) return res.status(404).json({ error: 'Event not found' });

        res.status(200).json({ message: 'Event approved successfully', event });
    } catch (error) {
        res.status(500).json({ error: 'Failed to approve event' });
    }
});
router.put('/revokeEvent/:id',async (req, res) => {
    try {
        const { id } = req.params;
        const event = await Event.findByIdAndUpdate(id, { status: 'pending' }, { new: true });
        
        if (!event) return res.status(404).json({ error: 'Event not found' });

        res.status(200).json({ message: 'Event revoked successfully', event });
    } catch (error) {
        res.status(500).json({ error: 'Failed to revoke event' });
    }
});
// Delete an event
router.delete('/deleteEvent/:id',async (req, res) => {
    try {
        const { id } = req.params;
        const event = await Event.findByIdAndDelete(id);

        if (!event) return res.status(404).json({ error: 'Event not found' });

        res.status(200).json({ message: 'Event deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete event' });
    }
});
module.exports=router;