<?php

namespace Drupal\ndiho_interface\Controller;

use Drupal;
use Drupal\Core\Controller\ControllerBase;
use Drupal\Core\Menu\MenuTreeParameters;
use Drupal\Core\Routing\RouteProvider;
use Drupal\Core\Url;

/**
 * Returns responses for Ndiho Interface routes.
 */
class NdihoInterfaceController extends ControllerBase {

  /**
   * Builds the response.
   */

  public function settingsPage(): array {
    $routeProvider = Drupal::service('router.route_provider');
    $content = [];

    $parameters = new MenuTreeParameters();
    $elements = Drupal::menuTree()->load('main', $parameters);
    foreach ($elements as $element) {
      Drupal::logger('test')->info($element->link->getTitle());
    }


    if ($routeProvider instanceof RouteProvider) {
      $socialMedia = $routeProvider->getRouteByName('ndiho_interface.social_media.settings');
      $donations = $routeProvider->getRouteByName('ndiho_interface.donation.settings');
      $content[] = [
        'title' => $socialMedia->getDefault('_title'),
        'url' => Url::fromUri('internal:' . $socialMedia->getPath()),
        'description' => $socialMedia->getDefault('_description')
      ];
      $content[] = [
        'title' => $donations->getDefault('_title'),
        'url' => Url::fromUri('internal:' . $donations->getPath()),
        'description' => $donations->getDefault('_description')
      ];
    }

    $output['ndiho_setting_links'] = [
      '#theme' => 'admin_block_content',
      '#content' => $content,
    ];
    return $output;
  }

  public function homepage(): array {
    return ['#theme' => 'homepage'];
  }

}
