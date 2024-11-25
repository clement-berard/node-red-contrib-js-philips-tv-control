import { PhilTVPairing } from 'philtv-js';

export default function () {
  let pjs: PhilTVPairing;

  RED.httpNode.post('/js-philips-tv-control/pairing', async (req, res) => {
    const { action, ip, pin } = req.body;

    if (action === 'start') {
      pjs = new PhilTVPairing({ tvIp: ip });

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
      const [error, config] = await pjs.completePairing(pin);

      if (error) {
        res.status(400).json({ success: false, message: error.message });
      }

      if (config) {
        res.status(200).json({ user: config.user, password: config.password });
      }
    } else {
      res.status(400).json({ success: false, message: 'Undefined action' });
    }
  });
}
