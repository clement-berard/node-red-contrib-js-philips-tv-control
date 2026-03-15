import { PhilTVPairing } from 'philtv-js';

export default function () {
  let pjs: PhilTVPairing;

  RED.httpNode.post('/js-philips-tv-control/pairing', async (req, res) => {
    const { action, ip, pin } = req.body;

    if (action === 'start') {
      pjs = new PhilTVPairing({ tvIp: ip });

      const initResponse = await pjs.init();

      if (initResponse.success === false) {
        res.status(400).json({ success: false, message: initResponse.error.message });
        return;
      }

      const startRes = await pjs.startPairing();

      if (startRes.success === false) {
        res.status(400).json({ success: false, message: startRes.error.message });
        return;
      }

      res.status(200).json({ success: false, message: startRes.data });
    } else if (action === 'complete') {
      const completeRes = await pjs.completePairing(pin as string);

      if (completeRes.success === false) {
        res.status(400).json({ success: false, message: completeRes.error.message });

        return;
      }

      if (completeRes.data) {
        res.status(200).json({ user: completeRes.data.user, password: completeRes.data.password });
      }
    } else {
      res.status(400).json({ success: false, message: 'Undefined action' });
    }
  });
}
