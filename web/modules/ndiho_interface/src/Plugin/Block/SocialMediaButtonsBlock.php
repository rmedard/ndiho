<?php

namespace Drupal\ndiho_interface\Plugin\Block;

use Drupal;
use Drupal\Core\Block\Annotation\Block;
use Drupal\Core\Block\BlockBase;
use Drupal\ndiho_interface\Form\SocialMediaSettings;

/**
 * Provides an example block.
 *
 * @Block(
 *   id = "ndiho_interface_social_media",
 *   admin_label = @Translation("Social Media"),
 *   category = @Translation("Ndiho Interface Blocks")
 * )
 */
class SocialMediaButtonsBlock extends BlockBase {

  /**
   * {@inheritdoc}
   */
  public function build(): array {
    $facebook = Drupal::config(SocialMediaSettings::SETTINGS)->get('facebook_page');
    $instagram = Drupal::config(SocialMediaSettings::SETTINGS)->get('instagram_page');
    $twitter = Drupal::config(SocialMediaSettings::SETTINGS)->get('twitter_page');
    $youtube = Drupal::config(SocialMediaSettings::SETTINGS)->get('youtube_page');
    return [
      '#theme' => 'social_media_buttons',
      '#facebook' => trim($facebook),
      '#twitter' => trim($twitter),
      '#instagram' => trim($instagram),
      '#youtube' => trim($youtube),
    ];
  }

}
