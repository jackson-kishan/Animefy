<?php

it('has api page', function () {
    $response = $this->get('/api');

    $response->assertStatus(200);
});
