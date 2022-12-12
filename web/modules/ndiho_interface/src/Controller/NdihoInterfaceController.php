<?php

namespace Drupal\ndiho_interface\Controller;

use Drupal\Core\Controller\ControllerBase;

/**
 * Returns responses for Ndiho Interface routes.
 */
class NdihoInterfaceController extends ControllerBase {

  /**
   * Builds the response.
   */
  public function homepage(): array {
    return ['#theme' => 'homepage'];
  }

}
