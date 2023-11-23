<?php

namespace Drupal\ndiho_interface\Form;

use Drupal\Core\Form\ConfigFormBase;
use Drupal\Core\Form\FormStateInterface;

class SocialMediaSettings extends ConfigFormBase {

  const SETTINGS = 'ndiho_interface.social_media.settings';

  protected function getEditableConfigNames(): array {
    return [static::SETTINGS];
  }

  public function getFormId(): string {
    return 'ndiho_social_media_settings_form';
  }

  public function buildForm(array $form, FormStateInterface $form_state): array {
    $config = $this->config(static::SETTINGS);
    $form['facebook_page'] = [
      '#type' => 'textfield',
      '#title' => $this->t('Facebook page'),
      '#default_value' => $config->get('facebook_page'),
      '#description' => $this->t('The full URL to the target facebook page')
    ];
    $form['twitter_page'] = [
      '#type' => 'textfield',
      '#title' => $this->t('Twitter page'),
      '#default_value' => $config->get('twitter_page'),
      '#description' => $this->t('The full URL to the target twitter page')
    ];
    $form['instagram_page'] = [
      '#type' => 'textfield',
      '#title' => $this->t('Instagram page'),
      '#default_value' => $config->get('instagram_page'),
      '#description' => $this->t('The full URL to the target instagram page')
    ];
    $form['youtube_page'] = [
      '#type' => 'textfield',
      '#title' => $this->t('Youtube page'),
      '#default_value' => $config->get('youtube_page'),
      '#description' => $this->t('The full URL to the target youtube page')
    ];
    return parent::buildForm($form, $form_state);
  }

  public function validateForm(array &$form, FormStateInterface $form_state) {
    if (!$form_state->isValueEmpty('facebook_page')) {
      $isValid = filter_var($form_state->getValue('facebook_page'), FILTER_VALIDATE_URL);
      if ($isValid === false) {
        $form_state->setErrorByName('facebook_page', t('This must be a valid URL starting with http or https'));
      }
    }
    if (!$form_state->isValueEmpty('twitter_page')) {
      $isValid = filter_var($form_state->getValue('twitter_page'), FILTER_VALIDATE_URL);
      if ($isValid === false) {
        $form_state->setErrorByName('twitter_page', t('This must be a valid URL starting with http or https'));
      }
    }
    if (!$form_state->isValueEmpty('instagram_page')) {
      $isValid = filter_var($form_state->getValue('instagram_page'), FILTER_VALIDATE_URL);
      if ($isValid === false) {
        $form_state->setErrorByName('instagram_page', t('This must be a valid URL starting with http or https'));
      }
    }
    if (!$form_state->isValueEmpty('youtube_page')) {
      $isValid = filter_var($form_state->getValue('youtube_page'), FILTER_VALIDATE_URL);
      if ($isValid === false) {
        $form_state->setErrorByName('youtube_page', t('This must be a valid URL starting with http or https'));
      }
    }
    parent::validateForm($form, $form_state);
  }

  public function submitForm(array &$form, FormStateInterface $form_state) {
    $this->configFactory->getEditable(static::SETTINGS)
      ->set('facebook_page', $form_state->getValue('facebook_page'))
      ->set('twitter_page', $form_state->getValue('twitter_page'))
      ->set('instagram_page', $form_state->getValue('instagram_page'))
      ->set('youtube_page', $form_state->getValue('youtube_page'))
      ->save();
    parent::submitForm($form, $form_state);
  }
}
