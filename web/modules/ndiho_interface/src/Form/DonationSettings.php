<?php

namespace Drupal\ndiho_interface\Form;

use Drupal\Core\Form\ConfigFormBase;
use Drupal\Core\Form\FormStateInterface;

class DonationSettings extends ConfigFormBase {

  const SETTINGS = 'ndiho_interface.donation.settings';

  protected function getEditableConfigNames(): array {
    return [static::SETTINGS];
  }

  public function getFormId(): string {
    return 'ndiho_donation_settings_form';
  }

  public function buildForm(array $form, FormStateInterface $form_state): array {
    $config = $this->config(static::SETTINGS);
    $form['paypal_me_username'] = [
      '#type' => 'textfield',
      '#title' => $this->t('Paypal Me Username'),
      '#default_value' => $config->get('paypal_me_username'),
      '#description' => $this->t('Paypal Me username for donations. (https://www.paypal.com/paypalme/{username})'),
      '#maxlength' => 64,
      '#size' => 64,
    ];
    $form['bank_account'] = [
      '#type' => 'textfield',
      '#title' => $this->t('Bank Account'),
      '#default_value' => $config->get('bank_account'),
      '#description' => $this->t('Bank account for donations. (BE12 1234 1234 1234)'),
      '#maxlength' => 20,
      '#size' => 20,
    ];
    return parent::buildForm($form, $form_state);
  }

  public function submitForm(array &$form, FormStateInterface $form_state) {
    $this->configFactory->getEditable(static::SETTINGS)
      ->set('paypal_me_username', $form_state->getValue('paypal_me_username'))
      ->save();
    parent::submitForm($form, $form_state);
  }
}
