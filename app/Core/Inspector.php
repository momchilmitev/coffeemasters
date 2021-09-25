<?php
declare(strict_types=1);
namespace Framework\Core;

use Framework\Helpers\StringMethods;
use Framework\Helpers\ArrayMethods;

class Inspector
{
    protected $class;

    protected $meta = [
        'class' => [],
        'properties' => [],
        'methods' => []
    ];

    protected $properties = [];

    protected $methods = [];

    public function __construct($class)
    {
        $this->class = $class;
    }

    protected function getClassComment()
    {
        $reflection = new \ReflectionClass($this->class);
        return $reflection->getDocComment();
    }

    protected function getClassPropertiesString()
    {
        $reflection = new \ReflectionClass($this->class);
        return $reflection->getProperties();
    }

    protected function getClassMethodsString()
    {
        $reflection = new \ReflectionClass($this->class);
        return $reflection->getMethods();
    }

    protected function getPropertyComment($property)
    {
        $reflection = new \ReflectionProperty($this->class, $property);
        return $reflection->getDocComment();
    }

    protected function getMethodComment($method)
    {
        $reflection = new \ReflectionMethod($this->class, $method);
        return $reflection->getDocComment();
    }

    protected function parse($comment)
    {
        $meta = [];
        $pattern = "(@[a-zA-Z]+\s*[a-zA-Z0-9, ()_]*)";
        $matches = StringMethods::match($comment, $pattern);
        if ($matches != null) {
            foreach ($matches as $match) {
                $parts = ArrayMethods::clean(
                    ArrayMethods::trim(
                        StringMethods::split($match, "[\s]", 2)
                    )
                );
                $meta[$parts[0]] = true;
                if (sizeof($parts) > 1) {
                    $meta[$parts[0]] = ArrayMethods::clean(
                        ArrayMethods::trim(
                            StringMethods::split($parts[1], ',')
                        )
                    );
                }
            }
        }
        return $meta;
    }

    public function getClassMeta()
    {
        if (!isset($meta['class'])) {
            $comment = $this->getClassComment();
            if (!empty($comment)) {
                $meta['class'] = $this->parse($comment);
            } else {
                $meta['class'] = null;
            }
        }
        return $meta['class'];
    }

    public function getClassProperties()
    {
        if (!isset($properties)) {
            $properties = $this->getClassPropertiesString();
            foreach ($properties as $property) {
                $properties[] = $property->getName();
            }
        }
        return $properties;
    }

    public function getClassMethods()
    {
        if (!isset($methods)) {
            $methods = $this->getClassMethodsString();
            foreach ($methods as $method) {
                $methods[] = $method->getName();
            }
        }
        return $methods;
    }

    public function getPropertyMeta($property)
    {
        if (!isset($meta['properties'][$property])) {
            $comment = $this->getPropertyComment($property);
            if (!empty($comment)) {
                $meta['properties'][$property] = $this->parse($comment);
            } else {
                $meta['properties'][$property] = null;
            }
        }
        return $meta['properties'][$property];
    }

    public function getMethodMeta($method)
    {
        if (!isset($meta['actions'][$method])) {
            $comment = $this->getMethodComment($method);
            if (!empty($comment)) {
                $meta['methods'][$method] = $this->parse($comment);
            } else {
                $meta['methods'][$method] = null;
            }
        }
        return $meta['methods'][$method];
    }
}
