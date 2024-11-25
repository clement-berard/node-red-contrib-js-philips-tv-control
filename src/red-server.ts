import { PhilTVPairing } from 'philtv-js';

export default function () {
  RED.httpNode.post('/js-philips-tv-control/pairing', async (req, res) => {
    const { action } = req.body;

    if (action === 'start') {
      console.log('on arrive bien la');
      const pjs = new PhilTVPairing({ tvIp: '10.0.0.19' });

      const [errInit, dataInit] = await pjs.init();

      if (errInit) {
        res.status(400).json({ success: false, message: errInit.message });
        return;
      }

      const [errStart] = await pjs.startPairing();

      if (errStart) {
        res.status(400).json({ success: false, message: errStart.message });
        return;
      }

      res.status(200).json({ success: false, message: dataInit });
    } else if (action === 'complete') {
      console.log('COMPLETE ROUTE');
    } else {
      res.status(400).json({ success: false, message: 'Action inconnue' });
    }
  });
}
