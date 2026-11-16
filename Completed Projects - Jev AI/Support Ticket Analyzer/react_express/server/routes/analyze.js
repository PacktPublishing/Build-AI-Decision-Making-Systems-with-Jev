import express from 'express';
import { TypeSafeClient, noul, choice, score } from '@typesafe-ai/sdk';

const router = express.Router();
const client = new TypeSafeClient({ defaultModel: 'jev-latest' });

router.post('/', async (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: 'message is required' });
  }

  const response = await client.systemOne({
    state: message,
    questions: {
      department: choice('Which team should handle this', {
        billing: 'Payment, charges, refunds, subscription, invoicing',
        technical: 'Bugs, errors, integration issues, API problems',
        account: 'Login, password, access, permissions',
        general: 'General enquiries that do not fit other categories',
      }),
      urgency: score('How urgent is this message', [
        'Calm, just asking a question or providing information',
        'Frustrated or concerned, some pressure to resolve quickly',
        'Very urgent or angry, demanding immediate action',
      ]),
      isRefund: noul('The customer is requesting a refund or compensation'),
      needsHuman: noul('This requires a human agent and cannot be automated'),
    },
  });

  res.json({ answers: response.answers });
});

export default router;
